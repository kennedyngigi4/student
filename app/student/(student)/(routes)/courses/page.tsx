"use client"
import axios from 'axios';
import { Input } from '@/components/ui/input';
import { useSession } from 'next-auth/react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';
import { columns } from './_components/columns';
import { DataTable } from './_components/data-table';

const StudentCoursesPage = () => {
  const { data:session } = useSession();
  const [purchasedCourses, setPurchasedCourses ] = useState([]);

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

  return (
    <section className="p-6 min-h-screen">
      <div className="flex items-center justify-between gap-x-10">
        <div className="bg-slate-50 py-5 rounded-2xl">
          <h1 className="font-bubblegum text-2xl font-bold">Courses you have purchased</h1>
          <p className="text-slate-600">Think it. Build it. Change the world! 🚀</p>
        </div>
      </div>


      <div className="py-6">
        <div className="w-[40%] pb-6">
          <Input className="bg-white" placeholder="Search by course" />
        </div>

        <DataTable columns={columns} data={purchasedCourses} />
        
        
      </div>
      
    </section>
  )
}

export default StudentCoursesPage