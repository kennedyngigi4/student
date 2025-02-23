import React, { useState } from 'react'
import { Menu } from 'lucide-react';

import {
    Sheet,
    SheetContent,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import Logo from '@/app/student/(student)/_components/logo';
import { Button } from '@/components/ui/button';


const SidebarDrawer = () => {
    const [ isOpen, setIsOpen ] = useState(false);
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
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
        <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
            <Menu onClick={() => setIsOpen(true)} />
        </SheetTrigger>
        <SheetContent side="left" className="p-6 bg-white">
            <Logo />
            <ul className="flex flex-col justify-between items-baseline gap-y-3 pt-8">
                {links.map((link) => (
                    <li key={link.name} onClick={() => setIsOpen(false)}>
                        <Link
                            href={link.href}
                            
                            className={`text-isky_blue font-semibold font-lg ${pathname === link.href ? "text-isky_orange" : "text-isky_blue hover:text-isky_orange"}`}>
                            {link.name}
                        </Link>
                    </li>

                ))}
            </ul>
            <div className="mt-8">
                <Link  href="/join/signin">
                    <Button variant="outline" className={`border-isky_blue text-isky_blue hover:bg-isky_blue hover:text-white font-semibold rounded-3xl px-8 py-5 ${pathname == "/join/signin" ? "bg-isky_orange text-white border-0" : ""}`}>Login to Dashboard</Button>
                </Link>
            </div>
              
                  <SheetTitle>
                      
                  </SheetTitle>
              
        </SheetContent>
          
    </Sheet>
  )
}

export default SidebarDrawer