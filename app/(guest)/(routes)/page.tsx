"use client"

import { Button } from '@/components/ui/button'
import { ArrowRight, BrainCircuit, Globe, Lightbulb, MoveRight, Share2, SmilePlus, Sparkles, Star } from 'lucide-react'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Carousel, CarouselItem, CarouselContent, CarouselNext, CarouselPrevious } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion'
import Link from 'next/link'
import axios from 'axios'
import Testimonials from '../_components/testimonials'
import Partners from '../_components/partners'
import Sliders from '../_components/sliders'

const HomePage = () => {

  const [ courses, setCourses ] = useState([]);

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/`)
        .then(( response) => {
          console.log(response.data)
          setCourses(response.data);
        });
    
  }, []);

  

  return (
    <section>

      {/* HERO AREA */}
      {/* <section className="bg-sky-50">
        <div className="grid md:grid-cols-12 grid-cols-12 max-lg:grid-cols-1 md:px-20 px-10 space-x-10 pt-16">
          <div className="col-span-5">
            <Image src="/images/others/main2.png" className="w-full" width={250} height={200} alt="ISKY TECH" />
          </div>
          <div className="col-span-6">
            <p className="font-semibold text-isky_blue">Welcome to iSkyTech</p>
            <h1 className="text-4xl font-extrabold font-lato text-isky_orange">Where Young Creators Become Tech Innovators!</h1>
            <p className="pt-2">
              Imagine a world where learning feels like an epic adventure! At ISKY Tech, we turn classrooms into innovation hubs, 
              where kids and teens learn coding, robotics, game design, AI, and cybersecurity all while having a blast!
            </p>
            <div className="py-5">
              <Link href="/join/signup">
                <Button className="py-6 rounded-full bg-isky_orange hover:bg-isky_blue">GET STARTED <ArrowRight className="h-10 w-10 ml-3" /></Button>
              </Link>
            </div>
          </div>
        </div>
      </section> */}

      <section className="">
        <Sliders />
      </section>



      <section className="md:py-16 py-4">
        <section className="grid md:grid-cols-12 grid-cols-1 gap-x-10 md:px-20 px-5">
          <div className="md:col-span-6">
            <h6 className="text-isky_orange font-semibold">ABOUT US</h6>
            <h1 className="text-4xl font-bold leading-10 font-bubblegum">
              Globally Recognized Interactive Preschool Education
            </h1>
            <p className="py-3 text-slate-600">
              We are dedicated to transforming the learning experience by providing reliable, 
              cost-effective, innovative technology solutions that foster critical thinking, 
              creativity, and collaboration in schools and academic institutions.
            </p>

            <div className="grid md:grid-cols-2 grid-cols-1 w-full gap-x-10 mt-6">
              <div className="space-y-6">
                <div className="flex flex-row">
                  <div className="bg-isky_blue rounded-lg p-1 mr-2">
                    <SmilePlus className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-bold text-xl leading-6">Interactive, Fun Learning</h1>
                </div>

                <div className="flex flex-row">
                  <div className="bg-isky_orange rounded-lg p-1 mr-2">
                    <Sparkles className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-bold text-xl leading-6">Learn from Tech Wizards</h1>
                </div>
                
                <div className="flex flex-row">
                  <div className="bg-isky_blue rounded-lg p-1 mr-2">
                    <Lightbulb className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-bold text-xl leading-6">Real-World Skills</h1>
                </div>
                
              </div>
              <div className="space-y-6 max-md:mt-6">
                <div className="flex flex-row">
                  <div className="bg-isky_orange rounded-lg p-1 mr-2">
                    <Globe className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-bold text-xl leading-6">International Community</h1>
                </div>

                <div className="flex flex-row">
                  <div className="bg-isky_blue rounded-lg p-1 mr-2">
                    <Share2 className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-bold text-xl leading-6">Well-Built Infrastructure</h1>
                </div>

                <div className="flex flex-row">
                  <div className="bg-isky_orange rounded-lg p-1 mr-2">
                    <BrainCircuit className="w-8 h-8 text-white" />
                  </div>
                  <h1 className="font-bold text-xl leading-6">Child Friendly</h1>
                </div>
              </div>
            </div>


          </div>

          <div className="md:col-span-6">
            <div className="grid md:grid-cols-2 grid-cols-1 space-x-3">
              <Image src="/images/others/about/4.jpg" alt="ISKY TECH" width={400} height={500} className="rounded-3xl border-dashed border-4 border-isky_blue max-md:mt-5" />
              <Image src="/images/others/about/2.jpeg" alt="ISKY TECH" width={400} height={500} className="rounded-3xl md:block hidden" />
            </div>
          </div>
          

        </section>
      </section>


      <section className="bg-sky-50">
        <section className="py-10 md:px-20 px-5">
          <div className="py-4 md:w-[70%] w-full mx-auto">
            <h4 className="font-semibold text-center text-isky_blue">POPULAR COURSES</h4>
            <h1 className="font-bold md:text-3xl text-2xl text-center text-isky_orange pb-3 font-bubblegum">Most preferred courses by our students and parents.</h1>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-4">

            {courses.slice(0, 4).map((course: any) => (
              <div key={course.course_id}>
                <Link href={`/courses/${course.course_id}/${course?.title}`} >
                  <Card className="bg-transparent hover:cursor-pointer shadow-none border-4 border-dotted border-isky_blue hover:border-isky_orange">
                    <CardContent>
                      <Image src={course.imagePath} width={300} height={300} alt={course.title} className="pt-5 rounded-xl" />
                      <h1 className="text-md font-semibold line-clamp-2 pt-2">{course.title}</h1>
                      <p className="pt-4 line-clamp-2 text-sm text-slate-500 mb-4">{course.description}</p>

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

          

        </section>
      </section>


      <section className="">
        <section className="flex flex-col py- md:px-20 px-10">
          <div className="py-3 w-[70%] mx-auto">
            <h1 className="font-bold text-3xl text-center text-isky_orange">Testimonials</h1>
          </div>
          <Testimonials />
        </section>
      </section>

      
      <section className="bg-sky-50">
        <section className="py-10 md:px-20 px-5">
          <div className="py-4 md:w-[70%] w-full mx-auto">
            <h4 className="font-semibold text-center text-isky_blue">LATEST TAILORED COURSES</h4>
            <h1 className="font-bold text-3xl text-center text-isky_orange pb-3 font-bubblegum">Unique Approaches To Teaching Combined Technology & Learning.</h1>
          </div>

          <div className="grid md:grid-cols-4 grid-cols-1 gap-6">

            {courses.map((course: any) => (
              <div key={course.course_id}>
                <Link href={`/courses/${course.course_id}/${course?.title}`} >
                  <Card className="bg-transparent hover:cursor-pointer shadow-none border-4 border-dotted border-isky_blue hover:border-isky_orange">
                    <CardContent>
                      <Image src={course.imagePath} width={500} height={500} alt={course.title} className="pt-5 rounded-xl" />
                      <h1 className="text-md font-semibold line-clamp-2 pt-2">{course.title}</h1>
                      <p className="pt-4 line-clamp-2 text-sm text-slate-500 mb-4">{course.description}</p>

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

          <div className="text-center pt-6">
            <Link href="/courses"><Button className="rounded-full px-8 py-5 font-lato font-semibold">VIEW ALL COURSES <MoveRight /> </Button></Link>
          </div>

        </section>
      </section>
      

      <section className="bg-isky_blue">
        <section className="pt-12 md:px-20 px-5">
          
          <div className="grid md:grid-cols-12 grid-cols-1 gap-x-4">
            <div className="md:col-span-5">
              <Image src="/images/others/history.png" width={330} height={500} alt="Our Journey" className="" />
              
            </div>

            <div className="md:col-span-7">
              <h4 className="font-semibold text-white pt-6">A BRIEF HISTORY</h4>
              <h1 className="font-bold text-4xl text-white pb-5 font-bubblegum">Our Journey</h1>

              <p className="text-white">
                We began with a vision: to prepare young minds for the rapidly changing digital world. Recognizing the
                evolving skills needed to thrive, we set out to make technology an adventure. By teaching coding, robotics,
                digital literacy, AI, VR and cybersecurity through hands-on experiences, we aim to make learning both
                essential and enjoyable.
              </p>
              <p className="text-white pt-2">
                Our journey has always been about empowering young learners—not just to participate in the digital age but to
                lead it. Today, we remain committed to equipping, inspiring, and preparing the next generation to shape a
                future driven by technology.
              </p>

              <div className="my-6">
                <Link href="/about-us">
                  <Button className="py-5 rounded-3xl px-5 bg-white text-isky_orange font-semibold hover:bg-isky_orange hover:text-white">LEARN MORE <MoveRight className="ml-3" /></Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>

      <section className="bg-sky-50">
        <section className="grid md:grid-cols-12 grid-cols-1 py-10 md:px-20 px-5 gap-x-10">
          
          <div className="md:col-span-7">
            <h1 className="text-4xl font-extrabold font-bubblegum">Frequently Asked Questions</h1>
            
            <div className="mt-10">
              <Accordion className="space-y-3" type="single" collapsible>
                
                <AccordionItem key="What is iSkyTech" className="bg-white px-4 rounded-2xl shadow-md" value="What is iSkyTech">
                  <AccordionTrigger className="text-isky_blue font-semibold">What is ISKY TECH?</AccordionTrigger>
                  <AccordionContent>
                    ISKY Tech is an interactive online learning platform where kids and teens (ages 6-18) can learn coding, robotics, game design, AI, cybersecurity, and more in a fun and engaging way!
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem key="Who can join iSkyTech" className="bg-white px-4 rounded-2xl shadow-md" value="Who can join iSkyTech">
                  <AccordionTrigger className="text-isky_blue font-semibold">Who can join ISKY TECH?</AccordionTrigger>
                  <AccordionContent>
                    Anyone aged 6 to 18 who loves technology, wants to learn new skills, or is just curious about coding, robotics, and digital creativity! No prior experience needed!
                  </AccordionContent>
                </AccordionItem>
              
                <AccordionItem key="coding programs" className="bg-white px-4 rounded-2xl shadow-md" value="coding programs">
                  <AccordionTrigger className="text-isky_blue font-semibold">How are ISKY TECH courses different from other coding programs?</AccordionTrigger>
                  <AccordionContent>
                    Unlike traditional courses, ISKY TECH focuses on hands-on, interactive learning with real-world projects, gamification, and live mentoring—making tech education fun and engaging!
                  </AccordionContent>
                </AccordionItem>
                
                <AccordionItem key="coding experience" className="bg-white px-4 rounded-2xl shadow-md" value="coding experience">
                  <AccordionTrigger className="text-isky_blue font-semibold">Do students need prior coding experience?</AccordionTrigger>
                  <AccordionContent>
                    Nope! Whether your child is a complete beginner or an advanced coder, we have age-appropriate courses designed to fit all skill levels.
                  </AccordionContent>
                </AccordionItem>

                <AccordionItem key="classes work" className="bg-white px-4 rounded-2xl shadow-md" value="classes work">
                  <AccordionTrigger className="text-isky_blue font-semibold">How do ISKY TECH classes work?</AccordionTrigger>
                  <AccordionContent>
                    Our classes are live, interactive, and hands-on. Students can choose between one-on-one sessions for personalized learning or group classes for a collaborative experience.
                  </AccordionContent>
                </AccordionItem>


                <AccordionItem key="needs help" className="bg-white px-4 rounded-2xl shadow-md" value="needs help">
                  <AccordionTrigger className="text-isky_blue font-semibold">What if my child gets stuck or needs help?</AccordionTrigger>
                  <AccordionContent>
                    Our expert mentors and instructors are always available during live sessions, plus students get access to a support community and resources to help them succeed.
                  </AccordionContent>
                </AccordionItem>


                <AccordionItem key="beginner" className="bg-white px-4 rounded-2xl shadow-md" value="beginner">
                  <AccordionTrigger className="text-isky_blue font-semibold">What's the best course for a beginner?</AccordionTrigger>
                  <AccordionContent>
                    For younger kids (ages 6-8), we recommend "Intro to Coding with Scratch Jr.".
                    For older beginners, "Game Development with Scratch" or "Beginner Python Programming" is a great place to start!
                  </AccordionContent>
                </AccordionItem>


                <AccordionItem key="difficulties" className="bg-white px-4 rounded-2xl shadow-md" value="difficulties">
                  <AccordionTrigger className="text-isky_blue font-semibold">What if we have technical difficulties?</AccordionTrigger>
                  <AccordionContent>
                    No worries! Our tech support team is available to help troubleshoot any issues so your child can focus on learning.
                  </AccordionContent>
                </AccordionItem>


              </Accordion>
            </div>
          </div>
          <div className="md:col-span-5">
            <Image src="/images/others/about/1.jpg" width={700} height={100} className="md:rounded-full md:block hidden" alt="Frequently Asked Questions" />
          </div>

        </section>
      </section>

    </section>
  )
}

export default HomePage