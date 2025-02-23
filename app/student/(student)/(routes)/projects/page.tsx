"use client"

import { Button } from '@/components/ui/button'
import { PlusCircle } from 'lucide-react'
import React from 'react'

const StudentProjects = () => {
  return (
    <section className="p-6 h-screen">
      <div className="flex items-center justify-between gap-x-10">
        <div className="bg-slate-50 py-5 rounded-2xl">
          <h1 className="font-bubblegum text-2xl font-bold ">Projects done</h1>
          <p className="text-slate-600">Think it. Build it. Change the world! 🚀</p>
        </div>
        <div>
          <Button>
            <PlusCircle className="h-4 w-4 text-white" />
            Add a Project
          </Button>
        </div>
      </div>

      <div className="py-20">
        <h1 className="text-slate-600 font-bold">No projects found</h1>
      </div>

    </section>
  )
}

export default StudentProjects