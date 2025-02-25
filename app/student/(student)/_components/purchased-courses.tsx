"use client"

import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Book, Files } from 'lucide-react';
import Link from 'next/link';
import React from 'react'


interface PurchasedCoursesProps {
    courses: [];
}

const PurchasedCourses = ({ courses }: PurchasedCoursesProps) => {
    
  return (
    <div>
        {courses.map((course) => (
            <div className="py-4" key={course?.id}>
                <div className="grid md:grid-cols-12 grid-cols-3 pb-4 border-b-2">
                    <div className="md:col-span-4 col-span-2">
                        <p className="text-sm font-semibold flex"><Book className="h-4 w-4 text-isky_blue" /> Course</p>
                        <p className="truncate">{course?.course_title}</p>
                    </div>
                    <div className="md:col-span-3 hidden">
                        <p className="text-sm font-semibold flex"> Category</p>
                        <p className="flex text-sm"><Files className="h-4 w-4 mr-2" /> {course?.course_category}</p>
                    </div>
                    <div className="md:col-span-3 col-span-1">
                        <p className="text-sm font-semibold flex"> Completion</p>
                        <p className={cn("flex text-isky_orange font-semibold text-xs", course?.is_complete && "text-green-800")}>
                            {!course?.is_complete ? <>In progress</> : <>Completed</>}
                        </p>
                    </div>
                    <div className="md:col-span-2 col-span-3 mx-auto max-md:pt-5">
                        <Link href={`/student/courses/${course?.course}/${course?.id}/`}>
                            {course?.is_complete
                                ? <>
                                    <p className="font-semibold text-sm text-green-800">Details</p>
                                </>
                                : <>
                                    <Button variant="outline" size="sm">Continue</Button>
                                </>
                            }
                            
                        </Link>
                    </div>
                </div>
            </div>
        ))}
    </div>
  )
}

export default PurchasedCourses