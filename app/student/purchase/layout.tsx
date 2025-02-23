"use client"

import Footer from '@/app/(guest)/_components/footer'
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';
import NavBar from '@/app/(guest)/_components/navbar';

const StudentPaymentsLayout = ({
    children
} : { children: React.ReactNode }) => {
  const { status } = useSession();

  useEffect(() => {
    if (status != "authenticated") {
      toast.error("Please log in to purchase");
      return;
    }
  }, [status]);

  return (
    <section>
      <NavBar />
        <div className="flex md:px-20 px-5 py-10 items-center justify-center">
            {children}
        </div>
        <Footer />
    </section>
  )
}

export default StudentPaymentsLayout