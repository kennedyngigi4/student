"use client"
import React, { use } from 'react'

type Params = Promise<{ courseId: string }>;

const CourseIdPage = (props: { params: Params }) => {
    const resolvedParams = use(props.params);

  return (
      <section className="min-h-screen p-6">CourseIdPage: {resolvedParams?.courseId}</section>
  )
}

export default CourseIdPage