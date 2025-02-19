"use client"

import React from 'react'
import { useSession } from 'next-auth/react'
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Book, Files, Rocket, Trophy } from 'lucide-react';
import { Button } from '@/components/ui/button';
import PurchasedCourses from '../../_components/purchased-courses';

const StudentDashboard = () => {
  const { data: session, status } = useSession();

  return (
    <section className="p-6 bg-slate-50 min-h-screen">

      <div className="flex items-center justify-between gap-x-10">
        <div className="bg-slate-50 py-5 rounded-2xl">
          <h1 className="font-poppins text-2xl font-bold">Welcome back, {session?.user?.name}</h1>
          <p className="text-slate-600">Think it. Build it. Change the world! 🚀</p>
        </div>

        <div className="flex justify-between gap-x-8">
          <div className="items-start">
            <Card className="shadow-none">
              <CardContent className="p-5">
                <Trophy className="h-5 w-5 mb-2 mx-auto text-isky_orange" />
                <p className="text-isky_blue pt-2">Badges</p>
              </CardContent>
            </Card>
          </div>
          <div className="items-start">
            <Card className="shadow-none">
              <CardContent className="p-5">
                <h1 className="text-xl font-bold">0</h1>
                <p className="text-isky_blue pt-2">Points</p>
              </CardContent>
            </Card>
          </div>
          <div className="items-start">
            <Card className="shadow-none">
              <CardContent className="p-5">
                <h1 className="text-xl font-bold text-center">0</h1>
                <p className="text-isky_blue pt-2">Certificates</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      

      <div className="grid md:grid-cols-12 grid-cols-12 gap-x-6 mt-10">
        <div className="col-span-9">
          <div className="">
            <h1 className="font-bold">In progress learning content</h1>

            <PurchasedCourses />

          </div>
        </div>
        <div className="col-span-3">
          <div className="flex justify-between flex-col gap-y-6">
            <Card className="shadow-none border-2">
              <CardContent className="py-3">
                <h1>0</h1>
                <p>Learning Content</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-2">
              <CardContent className="py-3">
                <h1>0</h1>
                <p>Learning Time</p>
              </CardContent>
            </Card>

            <Card className="shadow-none border-2">
              <CardHeader>
                Goals
              </CardHeader>
              <CardContent className="py-3">
                <Rocket className="mx-auto h-8 w-8 text-isky_orange" />
                <p className="text-center text-slate-500 pt-3">Daily goals</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>

    </section>
  )
}

export default StudentDashboard