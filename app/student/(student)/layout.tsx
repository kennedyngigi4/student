"use client"

import React, { useEffect, useState } from 'react'
import Navbar from './_components/navbar'
import Sidebar from './_components/sidebar'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation';
import StudentFooter from './_components/footer'
import StreamVideoProvider from '@/providers/StreamClientProvider'

const StudentLayout = ({
    children
}: Readonly<{ children: React.ReactNode}>) => {
  const router = useRouter();
  const { data:session, status } = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (status == "unauthenticated" ){
      router.push("/join/signin");
    } else {
      setLoading(false);
    }
  }, [status, router])

  if(loading) return null;

  return (
    <section className="h-full">
        <div className="h-[50px] md:pl-56 fixed inset-y-0 w-full z-50">
          <Navbar />
          
        </div>
        <div className="hidden md:flex h-full w-56 flex-col fixed inset-y-0 z-50">
          <Sidebar />
        </div>
        <main className="md:pl-56 h-full pt-[50px] bg-slate-50">
          <StreamVideoProvider>
            {children}
          </StreamVideoProvider>
        </main>
        <div className='md:pl-56'>
          <StudentFooter />
        </div>
    </section>
    
  )
}

export default StudentLayout