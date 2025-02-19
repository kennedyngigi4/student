"use client"

import React, { useEffect } from 'react';
import Image from 'next/image';
import { Button } from '@/components/ui/button';

interface CourseDetailsProps{
    courseData: any;
    onStart: () => void;
}

const CourseDetails = ({ courseData, onStart } : CourseDetailsProps ) => {

  useEffect(() => {
    // console.log(courseData);
  }, [courseData]);

  return (
    <section className="flex flex-col w-full">
        
        
        
        <div className="grid md:grid-col-12 grid-cols-12 gap-5">
            <div className='col-span-12 md:col-span-6'>
              {courseData?.imagePath == ""
                ? <></>
                : <Image src={courseData?.imagePath} alt={courseData?.title} width={1440} height={400} />
              }
            </div>
            <div className='col-span-12 md:col-span-6'>
              <h1 className="text-isky_orange text-xl font-semibold pt-2">{courseData?.title}</h1>
              <p className="text-slate-700">{courseData?.description}</p>

              <div className="py-8 w-[30%]">
                  <Button className="bg-green-800 text-white" onClick={onStart}>Get started</Button>
              </div>
            </div>
        </div>

        <div className="py-6">
          <h1 className="text-lg font-semibold">Attachments</h1>
        </div>

    </section>
  )
}

export default CourseDetails