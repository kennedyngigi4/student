"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { RocketIcon } from 'lucide-react';
import Link from 'next/link';
import React from 'react'

interface ProjectCardProps {
    projectData: object;
}

const ProjectCard = ({ projectData }: ProjectCardProps) => {
  return (
    <section className="">
        <Link href={`/student/projects/${projectData?.project_id}`}>
            <Card>
                <CardHeader>
                    <CardTitle><RocketIcon className="h-9 w-9 text-isky_orange" /></CardTitle>
                </CardHeader>
                <CardContent>
                    <div>
                        <p className="text-sm text-isky_blue">{projectData?.category}</p>
                        <h1 className="text-isky_orange font-semibold pb-1 text-lg truncate">{projectData?.name}</h1>
                        <p>{projectData?.description}</p>
                    </div>
                </CardContent>
            </Card>
        </Link>
    </section>
  )
}

export default ProjectCard