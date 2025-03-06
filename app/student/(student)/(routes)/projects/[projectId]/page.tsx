"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import NameForm from './_components/name-form';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import CategoryForm from './_components/category-form';
import VideoForm from './_components/video-form';
import DescriptionForm from './_components/description-form';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowBigLeft, ArrowLeft, Trash2 } from 'lucide-react';
import { useRouter } from 'next/navigation';


const ProjectDetailsPage = ({ params } : { params: { projectId: string }}) => {
    const resolvedParams = React.use(params);
    const { data:session } = useSession();
    const [ projectData, setProjectData ] = useState();
    const router = useRouter();

    useEffect(() => {
      axios.get(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/projects/${resolvedParams?.projectId}/`, {
        headers: {
          "Authorization": `Token ${session?.accessToken}`
        }
      }).then((response) => {
        setProjectData(response.data);
      }).catch((error) => {
        toast.error("Something went wrong");
      })
    }, []);


    const requiredFields = [
      projectData?.name,
      projectData?.videoPath,
      projectData?.category,
      projectData?.description
    ]
    const isComplete = requiredFields.every(Boolean);

    const handlePublish = async() => {
      const data = {
        "is_published": !projectData.is_published
      }
      
      await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/projects/${resolvedParams?.projectId}/`, data, {
        headers: {
          "Authorization": `Token ${session?.accessToken}`
        }
      }).then((response) => {
        toast.success("Project updated");
        location.reload();
      }).catch((error) => {
        toast.error("Something went wrong");
      })
    }

    const handleDelete = async() => {
      await axios.delete(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/projects/${resolvedParams?.projectId}/`, {
        headers: {
          "Authorization": `Token ${session?.accessToken}`
        }
      }).then((response) => {
        toast.success("Project deleted successfully");
        router.push("/student/projects");
      }).catch((error) => {
        toast.error("Something went wrong");
      })
    }

    return (
      <section className="p-6 min-h-screen">

          <Link href="/student/projects">
            <Button variant="ghost"><ArrowLeft className="mr-2 h-4 w-4" /> Back to projects</Button>
          </Link>

          

          <div className="py-8 flex justify-between items-center">
            <div>
              <h1 className="text-xl">Project Setup</h1>
              <p className="text-slate-500">Save your projects details and publish</p>
            </div>
            <div className="space-x-2">
              <Button size="sm" disabled={!isComplete} onClick={handlePublish}>{ !projectData?.is_published ? "Publish" : "Unpublish"}</Button>
              <Button size="sm" className="" variant="destructive" onClick={handleDelete}><Trash2 className="h-4 w-4" /></Button>
            </div>
          </div>
          <div className="grid md:grid-cols-2 grid-cols-1 gap-6">
            <div className="">
              <div>
                <NameForm
                  initialData={projectData}
                  projectId={projectData?.project_id}
                />
              </div>

              <div className="mt-6">
                <CategoryForm
                  initialData={projectData}
                  projectId={projectData?.project_id}
                />
              </div>


              <div className="mt-6">
                <DescriptionForm
                  initialData={projectData}
                  projectId={projectData?.project_id}
                />
              </div>

            </div>
            <div>
              <div className="">
                <VideoForm
                  initialData={projectData}
                  projectId={projectData?.project_id}
                />
              </div>
            </div>
          </div>
      </section>
    )
}

export default ProjectDetailsPage