"use client"

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState, use } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Files } from 'lucide-react';
import { useRouter } from 'next/navigation';


type Params = Promise<{ courseId: string, purchaseId: string  }>;

const PurchaseIdPage = (props: { params: Params }) => {
    const resolvedParams = use(props.params);
    const { data:session } = useSession();
    const router = useRouter();
    const [ purchaseDetails, setPurchaseDetails] = useState({});
    const [ courseDetails, setCourseDetails ] = useState({});

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/purchased_course_details/${resolvedParams?.purchaseId}`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setPurchaseDetails(response.data);
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }, [resolvedParams?.purchaseId, session?.accessToken])


    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/course_details/${resolvedParams?.courseId}`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setCourseDetails(response.data)
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }, [resolvedParams?.courseId, session?.accessToken]);


    const handleStart = () => {
        const values = {
            progress: 1.0
        }

        axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/progress_update/${resolvedParams?.purchaseId}`, values, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setCourseDetails(response.data);
            location.reload();
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }


    const handleUnenroll = () => {
        axios.delete(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/unenroll/${resolvedParams?.purchaseId}/`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            if(response.data === 202){
                toast.success("You have unenrolled successfully")
                router.push("/student/courses");
            } else {
                toast.error("Something went wrong, please contact admin")
            }
            
        })
    }

  return (
      <section className="p-6 min-h-screen">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="w-full">
                  {courseDetails?.imagePath && (
                      <Image src={courseDetails?.imagePath} width={400} height={200} className="w-full" alt={courseDetails?.title} />
                  )}
            </div>
            <div className="">
                <h1 className="font-semibold font-bubblegum text-3xl">{courseDetails?.title}</h1>
                <h6 className="text-isky_orange pb-4">{courseDetails?.category}</h6>
                <p>{courseDetails?.description}</p>

                <div className="flex">
                    {purchaseDetails.progress == 0 && (
                        <div className="mt-3">
                            <Button className="bg-green-800 text-white" onClick={handleStart}>Get started</Button>
                        </div>
                    )}
                    {(purchaseDetails.progress == courseDetails?.chapters?.length && purchaseDetails.is_complete ) && (
                        <div className="flex mt-3 gap-x-3">
                            <a href={`https://backend.iskytech.net${purchaseDetails?.certificatePath}`} target='_blank' rel="noopener noreferrer">
                                <Button className="bg-green-800 text-white">Download Certificate</Button>
                            </a>
                            
                            <Button className="bg-isky_blue text-white">Leave a Review</Button>
                        </div>
                    )}

                    {(!purchaseDetails.is_complete ) && (
                        <Button onClick={handleUnenroll} variant="destructive" className="mt-3 ms-3">Unenroll</Button>
                    )} 
                </div>
                
            </div>
        </div>
        
        <div className="py-6">

            <div className="flex pt-4">
                <h1 className="font-semibold font-bubblegum text-xl">All Chapters</h1>
                <p className="text-sm text-slate-600 pt-1 ps-6">({purchaseDetails?.progress}/{courseDetails?.chapters?.length} completed)</p>
            </div>
            

            <div>
                {Object.values(courseDetails.chapters || {}).map((chapter) => (
                    <div className="grid md:grid-cols-12 grid-cols-1 border-b-2 py-3"  key={chapter?.chapter_id}>
                        <div className="col-span-4">
                            <h1 className="font-bubblegum text-isky_orange">Title</h1>
                            <h3>{chapter?.title}</h3>
                        </div>
                        <div className="col-span-4">
                            <h1 className="font-bubblegum text-isky_orange"></h1>
                            {/* {chapter?.is_published ? (
                                <Badge className="bg-green-600 text-xs">Published</Badge>
                            ) : (
                                <Badge className="bg-slate-700 text-xs">Coming soon</Badge>
                            )} */}
                            <h3 className="pt-4"><strong>Chapter:</strong> {chapter?.position}</h3>
                        </div>
                        <div className="col-span-4">
                            {(chapter?.position < purchaseDetails?.progress) && (
                                <Link href={`/student/courses/${resolvedParams?.courseId}/${resolvedParams?.purchaseId}/${chapter?.chapter_id}`}>
                                    <p className="text-green-800">Completed</p>
                                </Link>
                            )}
                            {(chapter?.position == purchaseDetails?.progress && !purchaseDetails?.is_complete) && (
                                <Link href={`/student/courses/${resolvedParams?.courseId}/${resolvedParams?.purchaseId}/${chapter?.chapter_id}`}>
                                    <Button className="bg-green-800">Continue</Button>
                                </Link>
                               
                            )}
                            {(chapter?.position == purchaseDetails?.progress && purchaseDetails?.is_complete ) && (
                                <Link href={`/student/courses/${resolvedParams?.courseId}/${resolvedParams?.purchaseId}/${chapter?.chapter_id}`}>
                                    <p className="text-green-800">Completed</p>
                                </Link>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>

        {courseDetails?.attachments > 0 && (  
            <div className="py-6">
                <h1 className="font-semibold font-bubblegum text-xl pt-4 pb-3">Course Attachments</h1>
                {Object.values(courseDetails.attachments || {}).map((attachment) => (
                    <p key={attachment?.attachment_id}>
                        <a className="flex pb-4" href={`${attachment?.attached_file}`} target='_blank'><Files className="h-5 w-5 mr-2" /> {attachment?.attached_file.split("/").at(-1)}</a>
                    </p>
                ))}
            </div>
        )}

        
      </section>
  )
}

export default PurchaseIdPage