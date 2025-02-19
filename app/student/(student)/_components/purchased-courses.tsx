"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import axios from 'axios';
import { Book, Files } from 'lucide-react';
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react'
import toast from 'react-hot-toast';


const PurchasedCourses = () => {
    const { data:session } = useSession();
    const [ purchasedCourses, setPurchasedCourses ] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/purchased_courses/`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setPurchasedCourses(response.data);
        }).catch(() => {
            toast.error("Something went wrong");
        })
    }, [session?.accessToken]);

  return (
    <div>
        {purchasedCourses.map((course) => (
            <div className="py-4" key={course?.id}>
                <div className="grid md:grid-cols-12 grid-cols-12 pb-4 border-b-2">
                    <div className="col-span-4">
                        <p className="text-sm flex"><Book className="h-4 w-4 text-isky_blue" /> Course</p>
                        <p>{course?.course_title}</p>
                    </div>
                    <div className="col-span-3">
                        <p className="text-sm flex"> Category</p>
                        <p className="flex text-sm"><Files className="h-4 w-4 mr-2" /> {course?.course_category}</p>
                    </div>
                    <div className="col-span-3">
                        <p className="text-sm flex"> Completion</p>
                        <p className={cn("flex text-isky_orange font-semibold text-xs", course?.is_complete && "text-green-800")}>
                            {!course?.is_complete ? <>In progress</> : <>Completed</>}
                        </p>
                    </div>
                    <div className="col-span-2">
                        <Link href={`/student/courses/${course?.course}/${course?.id}/`}>
                            <Button variant="outline" size="sm">Continue</Button>
                        </Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default PurchasedCourses