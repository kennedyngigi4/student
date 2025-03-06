"use client"

import axios from 'axios';
import { Button } from '@/components/ui/button';
import { PlusCircle } from 'lucide-react';
import Link from 'next/link';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import ProjectCard from './_components/project-card';


const StudentProjects = () => {
  const { data:session } = useSession();
  const [ projects, setProjects ] = useState([]);

  useEffect(() => {
    const getMyProjects = async() => {
      await axios.get(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/projects/`, {
        headers: {
          "Authorization": `Token ${session?.accessToken}`
        }
      }).then((response) => {
        setProjects(response.data);
      }).catch((error) => {
        toast.error("Something went wrong");
      })
    }
    getMyProjects();
  }, [session?.accessToken])

  return (
    <section className="p-6 h-screen">
      <div className="flex items-center justify-between gap-x-10">
        <div className="bg-slate-50 py-5 rounded-2xl">
          <h1 className="font-bubblegum text-2xl font-bold ">Projects done</h1>
          <p className="text-slate-600">Think it. Build it. Change the world! 🚀</p>
        </div>
        <div>
          <Link href="/student/projects/create">
            <Button>
              <PlusCircle className="h-4 w-4 text-white" />
              Add a Project
            </Button>
          </Link>
        </div>
      </div>

      {projects.length <= 0 
        ? <p className="font-bubblegum pt-10 text-xl text-slate-600">You haven't uploaded any project yet</p>
        : <>
          <div className="grid md:grid-cols-3 grid-cols-1 gap-6 py-8">
            {projects.map((project) => (
              <div key={project?.project_id}>
                <ProjectCard projectData={project} />
              </div>
            ))}

          </div>
        </>
      }

    </section>
  )
}

export default StudentProjects