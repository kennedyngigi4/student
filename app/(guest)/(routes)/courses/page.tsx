"use client"

import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card';
import axios from 'axios';
import Link from 'next/link'
import React, { useEffect, useState } from 'react'
import Image from 'next/image';
import { Star } from 'lucide-react';
import toast from 'react-hot-toast';



const CoursesPage = () => {
  const [ selectedCategory, setSelectedCategory ] = useState("");
  const [courses, setCourses] = useState([]);


  const fetchCourses = async (category = "") => {
    try{
      const url = category
          ? `${process.env.NEXT_PUBLIC_APIURL}/courses/courses/?category=${category}`
          : `${process.env.NEXT_PUBLIC_APIURL}/courses/courses/`

      const { data } = await axios.get(url);
      setCourses(data);
    } catch(error) {
      toast.error("Something went wrong");
    }
  }

  useEffect(() => {
    fetchCourses();
  }, []);



  const badgeCategories = [
    {
      id: 0,
      name: " ",
    },
    {
      id: 1,
      name: 'Game Design',
    },
    {
      id: 2,
      name: 'Robotics',
    },
    {
      id: 3,
      name: 'Web Development',
    },
    {
      id: 4,
      name: 'Digital Art',
    },
    {
      id: 5,
      name: 'Cyber Security',
    },
    {
      id: 6,
      name: 'App Development',
    },
    {
      id: 7,
      name: '3D Printing',
    },
    {
      id: 8,
      name: 'Computer Science',
    },
    {
      id: 9,
      name: 'Graphic Design'
    }
  ]


  


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

            <div className="flex flex-row ps-72 overflow-x-auto whitespace-nowrap space-x-6 pt-8 pb-2 mb-8 justify-center items-center">
              {badgeCategories.map((category) => (
                <div className="" key={category.id}>
                  <Badge onClick={() => fetchCourses(category.name)} className="px-4 py-2 shadow-none bg-slate-500 hover:bg-isky_orange hover:text-white hover:cursor-pointer">{category.name == " " ? <>All</> : <>{category.name}</>}</Badge>
                </div>
              ))}
              
              
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-x-5 gap-y-6">

              {courses.length > 0 && (
                <>
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
                </>
              )}
            </div>


            {courses.length <= 0 && (
              <p className="text-2xl py-4 text-center font-bubblegum">Sorry this category has no course at the moment, please come back later.</p>
            )}


          </div>
        </section>
      </section>
    </section>
  )
}

export default CoursesPage