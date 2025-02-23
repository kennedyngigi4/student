"use client"

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useRef, use,  useState } from 'react';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useRouter } from 'next/navigation';


type Params = Promise<{ courseId: string, purchaseId: string, chapterId: string }>;

const ChapterIdPage = (props: { params: Params }) => {
    const resolvedParams = use(props.params);
    const router = useRouter()
    const [ courseData, setCourseData ] = useState();
    const [ chapterData, setChapterData ] = useState({});
    const [ progressData, setProgressData ] = useState({});
    const { data:session } = useSession();
    const [ videoEnded, setVideoEnded ] = useState(false);
    const videoRef = useRef(null);

    useEffect(() => {
        // FETCH COURSE DATA
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/course_details/${resolvedParams?.courseId}`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setCourseData(response.data)
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }, [resolvedParams?.courseId, session?.accessToken]);


    useEffect(() => {
        // FETCH CHAPTER DATA
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/chapter_details/${resolvedParams?.chapterId}`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setChapterData(response.data)
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }, [resolvedParams?.chapterId, session?.accessToken]);


    useEffect(() => {
        // FETCH PROGRESS DATA
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/purchased_course_details/${resolvedParams?.purchaseId}`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setProgressData(response.data)
        }).catch(() => {
            toast.error("Something went wrong");
        })
        
    }, [resolvedParams?.purchaseId, session?.accessToken]);


    const handleVideoEnd = () => {
        toast.success("Congratulations for completing this chapter");
        setVideoEnded(true);
    }

    const handleContinue = async() => {
        const data = {
            progress: Number(progressData?.progress) + 1
        }

        await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/progress_update/${resolvedParams?.purchaseId}`, data, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setChapterData(response.data);
            router.push(`/student/courses/${resolvedParams?.courseId}/${resolvedParams?.purchaseId}`)
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }


    const handleCompleted = async() => {
        const data = {
            is_complete: true,
        }
        await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/course_completion/${resolvedParams?.purchaseId}`, data, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then(() => {
            router.push(`/student/courses/${resolvedParams?.courseId}/${resolvedParams?.purchaseId}/certificate`);
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }

    return (
        <section className="p-6 flex flex-col min-h-screen">
            <div>
                {chapterData?.videoPath && (
                    <video controls controlsList="nodownload" ref={videoRef} className="w-full" onEnded={handleVideoEnd} autoPlay>
                        <source src={chapterData?.videoPath} type="video/mp4" />
                        Your browser does not support the video tag.
                    </video>
                )}
            </div>
            
            <div className="pt-4">
                <h1 className="font-bubblegum text-2xl">{chapterData?.title}</h1>
                <p className="text-slate-700">{chapterData?.description}</p>
            </div>

            <div className="pt-4">
                {videoEnded && (
                    
                    <div>
                        { courseData?.chapters?.length > progressData.progress && (
                            <div className="py-6"><Button className="px-4" onClick={handleContinue}>Continue</Button></div>
                        )}
                        {(courseData?.chapters?.length == progressData.progress && !progressData.is_complete) && (
                            <div className="py-6"><Button className="px-4" onClick={handleCompleted}>Congratulations for completing</Button></div>       
                        )}
                    </div>
                    
                    
                )}
            </div>
            
        </section>
    )
}

export default ChapterIdPage