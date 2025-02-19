"use client"

import { MoveRight } from 'lucide-react'
import React from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

const AboutUsPage = () => {
  return (
    <>
      <section className="">

        <section className="bg-lightblue">
          <div className="grid md:grid-cols-12 grid-cols-12">
            <div className="md:col-span-6 col-span-12 bg-[url(/images/others/mission.png)] bg-cover bg-center">

            </div>
            <div className="md:col-span-6 col-span-12 pr-10 py-10">
              <Card className="border-0 shadow-none bg-lightblue">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-isky_orange">
                    Our Vision
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To be the leading catalyst for a global educational tech renaissance, where every young mind is inspired to 
                    harness technology as a powerful tool for creativity, innovation, and social impact, transforming the way we 
                    learn, connect, and shape the future.
                  </p>
                </CardContent>
              </Card>

              <Card className="border-0 shadow-none bg-lightblue">
                <CardHeader>
                  <CardTitle className="text-2xl font-bold text-isky_orange">
                    Our Mission
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p>
                    To be the leading catalyst for a global educational tech renaissance, where every young mind is inspired to
                    harness technology as a powerful tool for creativity, innovation, and social impact, transforming the way we
                    learn, connect, and shape the future.
                  </p>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>


        <section className="grid md:grid-cols-2 grid-cols-1 space-x-10 md:px-20 px-5">
          <div className="md:py-20 py-5">
            <h6 className="text-isky_orange font-semibold">ABOUT US</h6>
            <h1 className="text-4xl font-bold leading-10">
              Welcome to ISKY Tech
            </h1>
            <p className="py-3 text-slate-600">
              In an ever-evolving digital landscape, equipping our children with the right tools
              and knowledge is essential for their success. At IskyTech, we are an educational
              platform dedicated to transforming the learning experience by providing reliable,
              cost-effective, innovative technology solutions that foster critical thinking,
              creativity, and collaboration in schools and academic institutions.
            </p>

            <p className="py-3 text-slate-600">
              Imagine a learning environment where your child can explore coding, robotics, and
              digital design, all while developing essential life skills. Our platform offers
              interactive courses crafted by industry experts, ensuring that children not only
              grasp fundamental concepts but also apply them in real-world scenarios.
            </p>

            <p className="py-3 text-slate-600">
              Join us in this exciting mission! Together, we can pave the way for a brighter future
              where every child has the opportunity to thrive in a technology-driven world.
            </p>
          </div>

          <div className="md:py-5">
            <Image src="/images/others/about.png" alt="ISKY TECH" width={590} height={500} className="rounded-3xl border-dashed border-4 border-isky_blue mx-auto" />
            
          </div>

        </section>
      </section>

      <section className="bg-isky_orange">
        <section className="pt-12 md:px-20 px-5">

          <div className="grid md:grid-cols-12 grid-cols-1 gap-x-4">
            <div className="md:col-span-5">
              <Image src="/images/others/history3.png" width={400} height={300} alt="Our Journey" className="" />
            </div>

            <div className="md:col-span-7">
              <h4 className="font-semibold text-white pt-6">A BRIEF HISTORY</h4>
              <h1 className="font-bold text-4xl text-white pb-5">Our Journey</h1>

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
                <Link href="">
                  <Button className="py-5 rounded-3xl px-5 bg-white text-isky_orange font-semibold hover:bg-isky_blue hover:text-white">LEARN MORE <MoveRight className="ml-3" /></Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </section>


      
    </>
  )
}

export default AboutUsPage