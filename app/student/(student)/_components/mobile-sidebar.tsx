"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link';
import Navbar from './navbar';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Sidebar from './sidebar';
import { Menu } from 'lucide-react';

const MobileSidebar = () => {
    const { data: session, } = useSession();

    

    return (
        <Sheet>
            <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
                <Menu />
            </SheetTrigger>
            <SheetContent side="left" className="p-0 bg-white">
                <Sidebar />
            </SheetContent>
        </Sheet>
        
    )
}

export default MobileSidebar