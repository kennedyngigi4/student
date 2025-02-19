"use client"

import React from 'react'
import Image from 'next/image'
import Partners from '../../_components/partners'
import Testimonials from '../../_components/testimonials'
import { Carousel, CarouselContent, CarouselItem } from '@/components/ui/carousel'
import Autoplay from "embla-carousel-autoplay";
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { BriefcaseBusiness, HandshakeIcon, Laptop, LightbulbIcon, ShieldBan, User2Icon } from 'lucide-react'
import AnimatedCounter from '../../_components/animated-counter'

const WhyIskyPage = () => {

  const plugin = React.useRef(
    Autoplay({ delay: 5000, stopOnInteraction: true })
  );

  return (
    <section className="w-full">
      <section className="bg-[url(/images/bg/1.jpg)] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center bg-isky_blue bg-opacity-75 h-[400px]">
          <div className="md:w-[40%] w-[90%] text-center">
            <h1 className="text-3xl text-white font-extrabold">Empowering the Next Generation with Smart Learning Solutions!</h1>
            <p className="text-white text-lg pt-5">Discover why ISKY TECH is the preferred choice for young learners and educators alike.</p>
          </div>

        </div>
      </section>

      <section className="py-8 md:px-20 px-10">
        <div className="py-4 w-[70%] mx-auto">
          <h4 className="font-semibold text-center text-isky_blue"></h4>
          <h1 className="font-bold text-3xl text-center text-isky_blue pb-3">Features</h1>
        </div>

        <Carousel
          plugins={[plugin.current]}
          opts={{
            align: "start",

          }}
          className="w-full"
        >
          <CarouselContent>

            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <Card className="border-0 text-center h-ful shadow-none hover:cursor-pointer">
                <CardHeader>
                  <div className="bg-isky_blue mx-auto flex items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <Laptop className="h-10 w-10 text-white" />
                  </div>

                  <CardTitle className="text-isky_orange hover:text-isky_blue">
                    Engaging Content
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  Interactive lessons, gamified quizzes, and adaptive learning.
                </CardContent>
              </Card>
            </CarouselItem>


            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <Card className="border-0 text-center h-ful shadow-none hover:cursor-pointer">
                <CardHeader>
                  <div className="bg-isky_blue mx-auto flex items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <User2Icon className="h-10 w-10 text-white" />
                  </div>

                  <CardTitle className="text-isky_orange hover:text-isky_blue">
                    Personalized Learning
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  AI-driven progress tracking and customized lesson plans.
                </CardContent>
              </Card>
            </CarouselItem>


            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <Card className="border-0 text-center h-ful shadow-none hover:cursor-pointer">
                <CardHeader>
                  <div className="bg-isky_blue mx-auto flex items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <BriefcaseBusiness className="h-10 w-10 text-white" />
                  </div>

                  <CardTitle className="text-isky_orange hover:text-isky_blue">
                    Affordable & Accessible
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  Cost-effective solutions with offline learning support.
                </CardContent>
              </Card>
            </CarouselItem>


            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <Card className="border-0 text-center h-ful shadow-none hover:cursor-pointer">
                <CardHeader>
                  <div className="bg-isky_blue mx-auto flex items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <ShieldBan className="h-10 w-10 text-white" />
                  </div>

                  <CardTitle className="text-isky_orange hover:text-isky_blue">
                    Safe & Secure
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  Kid-friendly platform with parental controls and data security.
                </CardContent>
              </Card>
            </CarouselItem>


            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <Card className="border-0 text-center h-ful shadow-none hover:cursor-pointer">
                <CardHeader>
                  <div className="bg-isky_blue mx-auto flex items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <LightbulbIcon className="h-10 w-10 text-white" />
                  </div>

                  <CardTitle className="text-isky_orange hover:text-isky_blue">
                    Real-world Skills
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  Courses designed to develop problem-solving, creativity, and digital literacy.
                </CardContent>
              </Card>
            </CarouselItem>


            <CarouselItem className="md:basis-1/2 lg:basis-1/4">
              <Card className="border-0 text-center h-ful shadow-none hover:cursor-pointer">
                <CardHeader>
                  <div className="bg-isky_blue mx-auto flex items-center justify-center w-[70px] h-[70px] p-3 rounded-full">
                    <HandshakeIcon className="h-10 w-10 text-white" />
                  </div>

                  <CardTitle className="text-isky_orange hover:text-isky_blue">
                    Collaborative Learning
                  </CardTitle>

                </CardHeader>
                <CardContent>
                  Encourages teamwork and discussions.
                </CardContent>
              </Card>
            </CarouselItem>
          </CarouselContent>

        </Carousel>
      </section>

      <section className="bg-lightblue">
        <section className=''>
          <div className="">
            <div className="grid grid-cols-12 md:grid-cols-12 gap-x-14">
              <div className="col-span-6 max-md:col-span-12 bg-[url(/images/others/about/1.jpg)] bg-cover bg-center">
                {/* <Image src="/images/others/main.webp" width={280} height={360} className="w-full pt-28" alt="ISKY TECH Solutions" /> */}
              </div>
              <div className="col-span-6 max-md:col-span-12 max-md:px-10 flex flex-col gap-y-5 py-8 pr-16">
                <h1 className="text-3xl font-bold">Challenges We Address</h1>
                <div>
                  <div className='grid grid-cols-1 border border-slate-300 bg-white hover:border-isky_blue hover:cursor-pointer rounded-3xl md:grid-cols-12 p-5'>
                    <div className="col-span-3">
                      <Image src="/images/icons/1.png" width={100} height={100} alt="Higher Engagement and Motivation" />
                    </div>
                    <div className="col-span-9">
                      <h6 className="text-isky_orange font-semibold">Higher Engagement and Motivation</h6>
                      <p>
                        IskyTech provides real-time learning, along with interactive lessons and the ability to immediately apply concepts in coding projects, which will likely lead to higher engagement and motivation among children.
                      </p>
                    </div>

                  </div>
                </div>

                <div className="">
                  <div className='grid grid-cols-1 border border-slate-300 bg-white hover:border-isky_blue hover:cursor-pointer rounded-3xl md:grid-cols-12 p-5'>
                    <div className="col-span-3">
                      <Image src="/images/icons/2.png" width={100} height={100} alt="Higher Engagement and Motivation" />
                    </div>
                    <div className="col-span-9">
                      <h6 className="text-isky_orange font-semibold">Focused Niche Audience</h6>
                      <p>
                        IskyTech is designed exclusively for children aged 6-18 who want to learn coding. This targeted approach allows for the creation of specialized, age-appropriate curriculums that are engaging, simplified, and tailored to the learning style of younger students.
                      </p>
                    </div>

                  </div>
                </div>
                <div>
                  <div className='grid grid-cols-1 border border-slate-300 bg-white hover:border-isky_blue hover:cursor-pointer rounded-3xl md:grid-cols-12 p-5'>
                    <div className="col-span-3">
                      <Image src="/images/icons/3.png" width={100} height={100} alt="Higher Engagement and Motivation" />
                    </div>
                    <div className="col-span-9">
                      <h6 className="text-isky_orange font-semibold">Technology Gap</h6>
                      <p>
                        There is currently a significant gap in the market for coding schools aimed at young learners globally, IskyTech is offering a first-mover advantage to an emerging market with substantial potential.
                      </p>
                    </div>

                  </div>
                </div>
              </div>

            </div>

          </div>
        </section>
      </section>


      <section className="flex flex-col bg-[url(/images/bg/2.jpg)] bg-cover bg-center">
        <div className="flex flex-col items-center justify-center bg-isky_orange bg-opacity-75 h-[400px]">
          <div className="md:w-[40%] w-[90%] mx-auto text-center pb-8">
            <h1 className="text-white text-2xl font-bold">Our Statistics</h1>
          </div>
          <div className="flex md:flex-row flex-col gap-y-5 gap-x-4 justify-between items-center">
            <Card className="pt-4 w-full h-full">
              <CardContent>
                <AnimatedCounter value={100} />
                <h5 className="font-semibold text-black">Completed Projects</h5>
              </CardContent>
            </Card>
            
            <Card className="pt-4 w-full h-full">
              <CardContent>
                <div className="flex">
                  <AnimatedCounter value={10} /><p className="font-bold">+</p>
                </div>
                <h5 className="font-semibold text-black">Experienced Instructors</h5>
              </CardContent>
            </Card>


            <Card className="pt-4 w-full h-full">
              <CardContent>
                <AnimatedCounter value={5} />
                <h5 className="font-semibold text-black">Certifications</h5>
              </CardContent>
            </Card>


            <Card className="pt-4 w-full h-full">
              <CardContent>
                <div className="flex">
                  <AnimatedCounter value={100} /><p className="font-bold">+</p>
                </div>
                
                <h5 className="font-semibold text-black">Enrolled Students</h5>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>


    </section>
  )
}

export default WhyIskyPage