"use client"

import axios from 'axios'
import { Button } from '@/components/ui/button'
import { FileVideo } from 'lucide-react'
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { useSession } from 'next-auth/react'
import { cn } from '@/lib/utils'
import { Progress } from '@/components/ui/progress'

interface VideoFormProps {
    initialData: any;
    projectId: string;
}

const VideoForm = ({
    initialData, projectId
}: VideoFormProps) => {

    const [isEditing, setIsEditing] = useState(false);
    const [video, setVideo] = useState(null);
    const [progress, setProgress] = useState(0);
    const { data: session } = useSession();

    const toggleEdit = () => setIsEditing((current) => !current);

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0];
        setVideo(selectedFile);
    }

    const handleVideoUpload = async () => {
        console.log(projectId);
        const formData = new FormData();
        formData.append("video", video);

        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/projects/${projectId}/`, formData, {
                headers: {
                    'Authorization': `Token ${session?.accessToken}`
                },
                onUploadProgress: (progressEvent) => {
                    const percentage = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                    setProgress(percentage);
                }
            }).then((response) => {
                toast.success("Project updated");
                toggleEdit();
                location.reload();
            }).catch((error) => {
                console.log(error);
                toast.error("Something went wrong");
            })

        } catch (error) {

            toast.error("Something went wrong");
        }
    }

    return (
        <div className="mt-6 border bg-slate-100 rounded-md p-4">
            <div className="font-medium flex items-center justify-between">
                Project video
                <Button onClick={toggleEdit} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <FileVideo className="h-4 w-4 mr-2" />
                            Upload video
                        </>
                    )}

                </Button>
            </div>

            {!isEditing && (
                <p className={cn("text-sm mt-2", !initialData?.video && "text-slate-500 italic")}>
                    {initialData?.videoPath
                        ? <>
                            <video controls className="w-full" autoPlay>
                                <source src={initialData?.videoPath} type="video/mp4" />
                            </video>
                        </>
                        : <>No video uploaded</>
                    }
                </p>
            )}


            {isEditing && (
                <form onSubmit={handleVideoUpload}>
                    <div className="py-3 w-[70%]">
                        <Input id="picture" type="file" className="bg-white" onChange={handleFileChange} />
                    </div>

                    {progress >0 && (
                        <Progress value={progress} className="bg-green-600 mb-3" />
                    )}
                    

                    <div>
                        <Button variant="default">Upload</Button>
                    </div>
                </form>
            )}

        </div>
    )
}

export default VideoForm