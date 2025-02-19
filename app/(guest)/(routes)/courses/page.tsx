"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Star } from 'lucide-react';

const CoursesPage = () => {

  const [courses, setCourses] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/`)
      .then((response) => {
        setCourses(response.data);
      });

  }, []);

  return (
    <section className="">
      <div className="md:h-[500px] h-[200px] bg-[url(/images/banners/courses.png)] bg-contain bg-center bg-no-repeat">
       
      </div>
      
      <section className="flex flex-col md:px-20 px-5">
        <section className="bg-white py-10">
          <div className="flex flex-col">
            <div className="flex flex-col text-center">
              <h1 className="text-2xl font-bold font-bubblegum">Our Courses</h1>
              <p className="text-lg pt-1">From critical skills to technical topics, ISKY supports your kids development.</p>
            </div>

            <div className="flex flex-row space-x-6 items-start md:block max-md:hidden pt-8 pb-4">
              <Badge className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer"><Link href="">Game Design</Link></Badge>
              <Badge className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer"><Link href="">Robotics</Link></Badge>
              <Badge className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer"><Link href="">Web Development</Link></Badge>
              <Badge className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer"><Link href="">Digital Art</Link></Badge>
              <Badge className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer"><Link href="">Cyber Security</Link></Badge>
              <Badge className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer"><Link href="">App Development</Link></Badge>
              <Badge className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer"><Link href="">3D Printing</Link></Badge>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-6">
              {courses.map((course) => (
                <div key={course?.course_id}>
                  <Link href={`/courses/${course?.course_id}`} >
                    <Card className="relative bg-transparent hover:cursor-pointer shadow hover:shadow-lg">
                      {course?.price > 30
                        ? (<>
                          <Badge className="absolute bg-isky_orange text-white">Top selling</Badge>
                        </>)
                        : (<></>)
                      }
                      <CardContent>
                        <Image src={course?.imagePath} width={300} height={300} alt={course?.title} className="pt-5 rounded-xl" />
                        <h1 className="text-md font-semibold leading-5 line-clamp-2 pt-2">{course?.title}</h1>
                        <p className="pt-4 line-clamp-2 text-slate-500 text-sm">{course?.description}</p>

                        <div className="flex gap-x-1 py-3">
                          <p className="text-sm font-semibold">4.5</p>
                          <div className="flex flex-row pt-1">
                            <Star className="h-3 w-3" fill='orange' stroke='orange' />
                            <Star className="h-3 w-3" fill='orange' stroke='orange' />
                            <Star className="h-3 w-3" fill='orange' stroke='orange' />
                            <Star className="h-3 w-3" fill='orange' stroke='orange' />
                            <Star className="h-3 w-3" fill='orange' stroke='orange' />
                          </div>
                          <span className="text-slate-500 text-sm">(32,980)</span>
                        </div>

                        
                      </CardContent>
                    </Card>
                  </Link> 
                </div>
              ))}
            </div>




          </div>
        </section>
      </section>
    </section>
  )
}

export default CoursesPage