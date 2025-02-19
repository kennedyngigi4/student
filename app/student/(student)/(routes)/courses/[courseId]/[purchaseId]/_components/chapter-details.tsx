"use client"

import { Button } from '@/components/ui/button';
import axios from 'axios';
import { ArrowBigRight } from 'lucide-react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import toast from 'react-hot-toast';

interface ChapterDetailsProps{
    courseId: string;
    currentChapterId: number;
    chapterCount: number;
    purchasedId: string;
}

const ChapterDetails = ({ courseId, currentChapterId, chapterCount, purchasedId }: ChapterDetailsProps) => {
    const { data:session } = useSession();
    const router = useRouter()
    const [ chapterData, setChapterData ] = useState();
    const [ videoEnded, setVideoEnded ] = useState(false);
    const videoRef = useRef(null);

    

    useEffect(() => {
        
        async function getData(){
            await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/chapter_details/${courseId}/${currentChapterId}`, {
                headers: {
                    'Authorization': `Token ${session?.accessToken}`
                }
            }).then((response) => {
                setChapterData(response.data);
                console.log(response.data)
            }).catch((error) => {
                console.log(error)
                toast.error("Something went wrong");
            })
        }

        getData();
        
    }, [currentChapterId, courseId, session?.accessToken]);

    const handleVideoEnd = () => {
        toast.success("Congratulations for completing this chapter");
        setVideoEnded(true);
    }

    const handleNextChapterUpdate = async() => {
        const data = {
            progress: Number(currentChapterId) + 1
        }

        await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/progress_update/${purchasedId}`, data, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setChapterData(response.data);
            location.reload();
           

        }).catch(() => {
            toast.error("Something went wrong");
        })
    }


    const handleCompletion = async () => {
        const data = {
            is_complete: true,
        }
        await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/course_completion/${purchasedId}`, data, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then(() => {
            router.push(`/student/courses/${courseId}/${purchasedId}/certificate`);
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }

    return (
        <section className="flex flex-col p-6">
            
            <div className="flex items-center justify-center w-full">
                {/* {chapterData?.videoPath} */}
                <video ref={videoRef} className="w-full" onEnded={handleVideoEnd} autoPlay>
                    <source src={chapterData?.videoPath} type="video/mp4" />
                    Your browser does not support the video tag.
                </video>
                
            </div>

            <div className="ps-10">
                <h1 className="text-2xl pt-10 font-semibold">{chapterData?.title}</h1>
                <p className="text-slate-700">{chapterData?.description}</p>

                {videoEnded && (
                    
                    <div>
                        { currentChapterId != chapterCount 
                            ? <>
                                <div className="py-6"><Button className="px-4" onClick={handleNextChapterUpdate}>Next <ArrowBigRight /></Button></div>
                            </>
                            : <>
                                <div className="py-5">
                                    {/* <Link href={`/student/courses/${courseId}/${purchasedId}/certificate`}> */}
                                        <Button variant="default" className="bg-green-700" onClick={handleCompletion}>Congratulations for completing the course!</Button>
                                    {/* </Link> */}
                                    
                                </div>
                            </>
                        }
                    </div>
                )}
                
                {/* {currentChapterId == chapterCount && (
                    <div className="py-5">
                        <Button variant="default" className="bg-green-700">Completed</Button>
                    </div>
                )} */}

            </div>
            
        </section>
    )
}

export default ChapterDetails