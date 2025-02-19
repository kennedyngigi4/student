"use client"

import axios from 'axios';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';
import Image from 'next/image';
import CourseDetails from './_components/course-details';
import ChapterDetails from './_components/chapter-details';
import Loader from '@/components/Loader';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import Link from 'next/link';
import { Files } from 'lucide-react';

const PurchaseIdPage = ({
    params
} : { params: { courseId: string, purchaseId: string } }) => {
    const resolvedParams = React.use(params);
    const { data:session } = useSession();
    const [ purchaseDetails, setPurchaseDetails] = useState({});
    const [ courseDetails, setCourseDetails ] = useState({});

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/purchased_course_details/${resolvedParams?.purchaseId}`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setPurchaseDetails(response.data);
        }).catch((error) => {
            toast.error("Something went wrong");
        })
    }, [])


    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/course_details/${resolvedParams?.courseId}`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setCourseDetails(response.data)
        }).catch((error) => {
            toast.error("Something went wrong");
        })
    }, []);


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
        }).catch((error) => {
            toast.error("Something went wrong");
        })
    }

    const certificate_url = "127.0.0.1:8000"+String(purchaseDetails?.certificate_url).slice(String(purchaseDetails?.certificate_url).indexOf("/media"));

  return (
      <section className="p-6 min-h-screen">
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
            <div className="w-full">
                  {courseDetails?.imagePath && (
                      <Image src={courseDetails?.imagePath} width={400} height={200} className="w-full" alt={courseDetails?.title} />
                  )}
            </div>
            <div>
                <h1 className="font-semibold font-bubblegum text-3xl">{courseDetails?.title}</h1>
                <h6 className="text-isky_orange pb-4">{courseDetails?.category}</h6>
                <p>{courseDetails?.description}</p>
                {purchaseDetails.progress == 0 && (
                    <div className="mt-3">
                        <Button className="bg-green-800 text-white" onClick={handleStart}>Get started</Button>
                    </div>
                )}
                {purchaseDetails.progress == courseDetails?.chapters?.length && (
                    <div className="flex mt-3 gap-x-3">
                        <a href={`${certificate_url}`} target='_blank'>
                            <Button className="bg-green-800 text-white">Download Certificate</Button>
                        </a>
                        
                        <Button className="bg-isky_blue text-white">Leave a Review</Button>
                    </div>
                )}
            </div>
        </div>
        
        <div className="py-6">
            <h1 className="font-semibold font-bubblegum text-xl pt-4">Course Chapters</h1>

            <div>
                {Object.values(courseDetails.chapters || {}).map((chapter: any) => (
                    <div className="grid md:grid-cols-12 grid-cols-1 border-b-2 py-3"  key={chapter?.chapter_id}>
                        <div className="col-span-4">
                            <h1 className="font-bubblegum text-isky_orange">Title</h1>
                            <h3>{chapter?.title}</h3>
                        </div>
                        <div className="col-span-4">
                            <h1 className="font-bubblegum text-isky_orange">Published</h1>
                            {chapter.is_published ? (
                                <Badge className="bg-green-600 text-xs">Published</Badge>
                            ) : (
                                <Badge className="bg-slate-700 text-xs">Coming soon</Badge>
                            )}
                            <h3></h3>
                        </div>
                        <div className="col-span-4">
                            {chapter?.position < purchaseDetails?.progress && (
                                <p className="text-green-800">Completed</p>
                            )}
                            {chapter?.position == purchaseDetails?.progress && (
                                <Link href={`/student/courses/${resolvedParams?.courseId}/${resolvedParams?.purchaseId}/${chapter?.chapter_id}`}>
                                    <Button className="bg-green-800">Continue</Button>
                                </Link>
                               
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </div>


        <div className="py-6">
            <h1 className="font-semibold font-bubblegum text-xl pt-4 pb-3">Course Attachments</h1>
            {Object.values(courseDetails.attachments || {}).map((attachment: any) => (
                <p key={attachment.attachment_id}>
                    <a className="flex pb-4" href={`${attachment?.attached_file}`} target='_blank'><Files className="h-5 w-5 mr-2" /> {attachment?.attached_file.split("/").at(-1)}</a>
                </p>
            ))}

        </div>


        {/* {purchaseDetails?.progress == 0.0 
            ? <CourseDetails courseData={courseDetails} onStart={handleStart} /> 
              : <ChapterDetails courseId={resolvedParams?.courseId} chapterCount={courseDetails?.chapters?.length} purchasedId={purchaseDetails?.id}  currentChapterId={purchaseDetails?.progress} />
        } */}
      </section>
  )
}

export default PurchaseIdPage