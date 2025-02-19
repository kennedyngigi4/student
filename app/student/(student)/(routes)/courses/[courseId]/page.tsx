"use client"
import React from 'react'

const CourseIdPage = ({
    params
} : { params: { courseId: string } }) => {
    const resolvedParams = React.use(params);

  return (
      <section className="min-h-screen p-6">CourseIdPage: {resolvedParams?.courseId}</section>
  )
}

export default CourseIdPage