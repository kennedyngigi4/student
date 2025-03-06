"use client"

import { Award, Layout, LibraryBig, SquareCode, Video } from 'lucide-react'
import React from 'react'
import SidebarItem from './sidebar-item'

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/student/dashboard",
    },
    {
        icon: LibraryBig,
        label: "My Courses",
        href: "/student/courses",
    },
    {
        icon: SquareCode,
        label: "My Projects",
        href: "/student/projects",
    },
    {
        icon: Video,
        label: "Online classes",
        href: "/student/meetings",
    },
    {
        icon: Award,
        label: "Awards",
        href: "/student/awards",
    },
    {
        icon: SquareCode,
        label: "Play Area",
        href: "/student/playarea",
    },
    
]

const SidebarRoutes = () => {
    const routes = guestRoutes;

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}

export default SidebarRoutes