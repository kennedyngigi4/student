"use client"

import React, { useEffect, useState, use } from 'react'
import { useRouter } from 'next/navigation';
import axios from 'axios';
import toast from "react-hot-toast";
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Clock, Laptop2, Mail, Phone, Star, Video, File, GraduationCap } from 'lucide-react';
import Image from 'next/image';
import ChaptersList from '@/app/(guest)/_components/chapters-list';
import { Button } from '@/components/ui/button';


type Params = Promise<{ courseId: string  }>;

const CourseIdPage = (props: { params: Params }) => {
    const resolvedParams = use(props.params);
    const [ course, setCourse ] = useState({});
    const [courses, setCourses] = useState([]);
    const router = useRouter();
    const { status } = useSession();
   

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/course/${resolvedParams?.courseId}`)
            .then((response) => {
                setCourse(response.data);
            }).catch(() => {
                toast.error("Something went wrong")
            })

    }, []);

    const techs = [
        {
            id: 1,
            logo: "/images/icons/e1.png"
        },
        {
            id: 2,
            logo: "/images/icons/e2.png"
        },
        {
            id: 3,
            logo: "/images/icons/e3.png"
        },
        {
            id: 4,
            logo: "/images/icons/e4.png"
        },
        {
            id: 5,
            logo: "/images/icons/e5.png"
        },
    ]

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/`)
        .then((response) => {
            setCourses(response.data);
        }).catch(() => {
            toast.error("Something went wrong")
        })
    }, []);


    const handlePurchase = () => {
        if (status != "authenticated") {
            toast.error("Please log in to purchase", { style: { background: "#ff0000", color: "#ffffff" } });
            return;
        } else {
            router.push(`/student/purchase/${course?.course_id}`);
        }
    }

    return (
        <section className="flex flex-col w-full">

            <div className="w-full h-[450] bg-cover bg-no-repeat bg-center" style={{ backgroundImage: `url(${course.imagePath})` }}>
                <div className="bg-gradient-to-r grid grid-cols-1 md:grid-cols-12 py-16 px-20 justify-center  items-start from-isky_blue from-20% h-full">

                    <div className="flex flex-col col-span-6">
                        <span className="flex flex-row  gap-x-1 text-white font-semibold"><GraduationCap /> {course.level}</span>
                        <h1 className="text-white font-bold text-3xl">{course.title}</h1>

                        <div className="flex flex-row py-3 gap-x-3">
                            <div className="flex flex-row pt-1">
                                <Star className="h-4 w-4" fill='orange' stroke='orange' />
                                <Star className="h-4 w-4" fill='orange' stroke='orange' />
                                <Star className="h-4 w-4" fill='orange' stroke='orange' />
                                <Star className="h-4 w-4" fill='orange' stroke='orange' />
                                <Star className="h-4 w-4" fill='orange' stroke='orange' />
                            </div>
                            <span className="text-white">(4.95)</span>
                        </div>

                        <p className="text-white pt-4 line-clamp-6">{course.description}</p>

                        <p className="flex items-center gap-x-3 text-white py-3"><Clock /> <strong>Last updated:</strong> {course.created_at}</p>

                    </div>

                    <div className='col-span-6 max-md:hidden justify-center pl-40'>

                    </div>

                </div>
            </div>


            <div className="grid grid-cols-1 md:grid-cols-12 gap-x-10 px-20 py-10">
                {/* COLUMN 1 */}
                <div className="col-span-8">
                    <div className="border-2 p-6">
                        <h1 className="pb-3 font-semibold text-xl text-isky_orange">Tech skills you will learn</h1>

                        <div className="grid grid-cols-3 md:grid-cols-5 gap-1">
                            {techs.map((tech) => (
                                <div key={tech.id}>
                                    <Image src={tech.logo} width={40} height={40} alt="" />
                                </div>
                                // <Badge key={skill} className="py-1 px-3 font-normal bg-slate-100" variant="outline">{skill}</Badge>
                            ))}
                        </div>
                    </div>

                    <div>
                        <ChaptersList
                            initialData={course?.chapters}
                        />
                    </div>


                    <div>
                        <h1 className="text-2xl font-semibold pb-3 text-isky_blue">Description</h1>
                        <p className="text-slate-700 hover:text-black">{course?.description}</p>
                    </div>

                </div>

                {/* COLUMN 2 */}
                <div className="col-span-4">
                    <video className="" width="900" height="440" autoPlay controls preload="none">
                        <source src={course.previewVideoURL} type="video/mp4" />
                        <track
                            src={course.previewVideoURL}
                            kind="subtitles"
                            srcLang="en"
                            label="English"
                        />
                        Your browser does not support the video tag.
                    </video>
                    <div className="col-span-4 shadow-md p-6">

                        <Button variant="default" onClick={handlePurchase} className="w-full py-5 rounded-2xl bg-isky_blue text-white text-lg font-semibold hover:bg-white border-1 hover:border-isky_blue hover:border-2 hover:text-isky_blue">Buy Now</Button>

                        <div className="py-6">
                            <h1 className="font-semibold text-isky_orange">This course includes</h1>

                            <div className="flex flex-col space-y-2 pt-4">
                                <div className="flex"><Video className="text-isky_orange mr-4" /> 10 video lessons</div>
                                <div className="flex"><Laptop2 className="text-isky_orange mr-4" /> Access on desktop, tablet and mobile</div>
                                <div className="flex"><Clock className="text-isky_orange mr-4" /> Full lifetime access</div>
                                <div className="flex"><File  className="text-isky_orange mr-4" /> Certificate of completion</div>
                            </div>
                        </div>
                    </div>

                    <Card className="mt-6 bg-isky_orange text-white">
                        <CardHeader>
                            <CardTitle className="text-lg">
                                Have Any Question?
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <p>Feel free to reach out! We are here to help you get the most out of your learning experience.</p>

                            <div className="pt-4">
                                <div className="flex"><Phone className="h-5 w-5 mr-3" /> +971506044114</div>
                                <div className="flex"><Mail className="h-5 w-5 mr-3" /> support@iskytech.net</div>
                            </div>

                        </CardContent>
                    </Card>

                </div>

            </div>

            <div className="pt-8 md:px-20 px-10 w-full pb-8">
                <div className='flex text-center'>
                    <h1 className="text-center text-2xl font-semibold">Related Courses</h1>
                </div>

                <div className="grid md:grid-cols-4 grid-cols-1 gap-4 pt-3">
                    {courses.slice(0, 4).map((newCourse) => (
                        <div key={newCourse.course_id}>
                            <Link href={`/courses/${newCourse.course_id}/${newCourse?.title}`}>
                                <Card className="bg-white hover:cursor-pointer shadow-none border-4 border-dotted border-isky_blue hover:border-isky_orange">
                                    <CardContent>
                                        <Image src={newCourse.imagePath} width={300} height={300} alt={newCourse.title} className="pt-5 rounded-xl" />
                                        <h1 className="text-md font-semibold line-clamp-2 pt-2">{newCourse?.title}</h1>
                                        <p className="pt-4 line-clamp-2 text-sm text-slate-500 mb-4">{newCourse?.description}</p>

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
    )
}

export default CourseIdPage