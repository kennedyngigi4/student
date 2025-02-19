"use client"
import React from 'react'
import { useSession } from 'next-auth/react';
import Link from 'next/link';

const MobileSidebar = () => {
    const { data: session, } = useSession();

    

    return (
        <section className="flex flex-row justify-between w-full items-center">
            <div>
               
            </div>

            <div className='flex justify-center items-center bg-isky_orange w-[30px] h-[30px] rounded-full'>
                <Link href="/student/profile" className='text-white font-semibold'>{session?.user?.name?.slice(0,1)}</Link>
            </div>
        </section>
    )
}

export default MobileSidebar