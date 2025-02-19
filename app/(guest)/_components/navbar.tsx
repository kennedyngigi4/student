"use client"

import { Button } from '@/components/ui/button'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { usePathname } from 'next/navigation'
import SidebarDrawer from './sidebar'

const NavBar = () => {

    const pathname = usePathname();


    const links = [
        {
            name: "About Us",
            href: "/about-us",
        },
        {
            name: "Courses",
            href: "/courses",
        },
        {
            name: "Why ISKY",
            href: "/why-isky",
        },
        {
            name: "Blogs",
            href: "/blogs",
        },
        {
            name: "Projects",
            href: "/projects",
        }
    ]


    return (
        <nav className="sticky top-0 bg-white flex flex-row justify-between items-center w-full md:px-20 px-10 py-3 shadow z-50">
            <div className="">
                <Link href="/">
                    <Image src="/logo1.png" className="" width={100} height={20}  alt="ISKY TECH"  />
                </Link>
            </div>
            <div>
                <SidebarDrawer />
            </div>
            <div className="max-md:hidden">
                <ul className="flex flex-row justify-between items-baseline gap-x-10">
                    {links.map((link) => (
                        <li key={link.name}>
                            <Link 
                                href={link.href} 
                                className={`text-isky_blue font-semibold font-lg ${ pathname === link.href ? "text-isky_orange" : "text-isky_blue hover:text-isky_orange" }`}>
                                    {link.name}
                            </Link>
                        </li>
                        
                    ))}
                </ul>
            </div>
            <div className="max-md:hidden">
                <Link href="/join/signin">
                    <Button variant="outline" className={`border-isky_blue text-isky_blue hover:bg-isky_blue hover:text-white font-semibold rounded-3xl px-8 py-5 ${pathname == "/join/signin" ? "bg-isky_orange text-white border-0" : ""}`}>Login to Dashboard</Button>
                </Link>
                
            </div>
        </nav>
    )
}

export default NavBar