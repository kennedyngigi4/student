"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Rocket, Trophy } from 'lucide-react';
import PurchasedCourses from '../../_components/purchased-courses';
import toast from 'react-hot-toast';

const StudentDashboard = () => {
  const { data: session } = useSession();
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


  const completedCourses = purchasedCourses.filter((course) => course?.is_complete == true);

  return (
    <section className="p-6 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between gap-x-10">
        <div className="bg-slate-50 py-5 rounded-2xl">
          <h1 className="font-bubblegum text-2xl font-bold">Welcome back, {session?.user?.name}</h1>
          <p className="text-slate-600">Think it. Build it. Change the world! 🚀</p>
        </div>

        <div className="flex justify-between gap-x-8">
          <div className="items-start">
            <Card className="shadow-none">
              <CardContent className="p-5">
                <Trophy className="h-5 w-5 mb-2 mx-auto text-isky_orange" />
                <p className="text-isky_blue pt-2 font-semibold">Badges</p>
              </CardContent>
            </Card>
          </div>
          <div className="items-start">
            <Card className="shadow-none">
              <CardContent className="p-5">
                <h1 className="text-xl font-bold font-bubblegum">0</h1>
                <p className="text-isky_blue pt-2 font-semibold">Points</p>
              </CardContent>
            </Card>
          </div>
          <div className="items-start">
            <Card className="shadow-none">
              <CardContent className="p-5">
                <h1 className="text-xl font-bold text-center font-bubblegum">{completedCourses?.length}</h1>
                <p className="text-isky_blue pt-2 font-semibold">Certificates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      

      <div className="grid md:grid-cols-12 grid-cols-12 gap-x-6 mt-10">
        <div className="col-span-9">
          <div className="">
            <h1 className="font-bold font-bubblegum text-xl">Latest purchased courses</h1>

            {purchasedCourses.length <= 0 
              ? <p>You are not enrolled to any course yet.</p> 
              : <><PurchasedCourses courses={purchasedCourses} /></>
            }
            

          </div>
        </div>
        <div className="col-span-3">
          <div className="flex justify-between flex-col gap-y-6">
            <Card className="shadow-none border-2">
              <CardContent className="py-3">
                <h1 className="font-bubblegum text-2xl text-isky_orange">{purchasedCourses?.length}</h1>
                <p className="font-semibold pt-3">Purchased Courses</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-2">
              <CardContent className="py-3">
                <h1 className="font-bubblegum text-2xl text-isky_orange">{completedCourses?.length}</h1>
                <p className="font-semibold pt-3">Completed Courses</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-2">
              <CardHeader className="font-semibold">
                Goals
              </CardHeader>
              <CardContent className="py-3">
                <Rocket className="mx-auto h-8 w-8 text-isky_orange" />
                <p className="text-center font-semibold text-slate-500 pt-3">Daily goals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </section>
  )
}

export default StudentDashboard