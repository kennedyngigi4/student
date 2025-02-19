"use client"

import Footer from '@/app/(guest)/_components/footer'
import React, { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import toast from 'react-hot-toast';

const StudentPaymentsLayout = ({
    children
} : { children: React.ReactNode }) => {
  const { data:session, status } = useSession();

  useEffect(() => {
    if (status != "authenticated") {
      toast.error("Please log in to purchase");
      return;
    }
  }, [status]);

  return (
    <section>
        <div className="flex md:px-20 px-10 py-10 items-center justify-center h-screen">
            {children}
        </div>
        <Footer />
    </section>
  )
}

export default StudentPaymentsLayout