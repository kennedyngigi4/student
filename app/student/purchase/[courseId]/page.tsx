"use client"

import React, { useEffect, useState, use } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';
import { PayPalScriptProvider } from "@paypal/react-paypal-js"
import PaypalButton from '../_components/paypal-buttons';

type Params = Promise<{ courseId: string }>;
const StudentCoursePurchase = (props: { params: Params }) => {
  const { data:session } = useSession();
  const resolvedParmas = use(props.params);
  const router = useRouter();
  const [ course, setCourse ] = useState({});
  const [enrollementExists, setEnrollementExists ] = useState(false);
  // paypals
  const [ paid, setPaid ] = useState(false);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/course/${resolvedParmas.courseId}`)
    .then((response) => {
      setCourse(response.data);
    }).catch(() => {
      toast.error("Something went wrong");
    });
    
  }, [resolvedParmas.courseId]);


  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/payments/student/student_course_check/${resolvedParmas.courseId}/${session?.user?.id}`)
      .then((response) => {
        if(response.data.status_code === 409){
          // already purchased
          setEnrollementExists(true);
        } else if(response.data.status_code === 200){
          // doesnt exists
          setEnrollementExists(false);
        }
      }).catch(() => {
        toast.error("Something went wrong");
      });

  }, [resolvedParmas.courseId]);


  // PaypalPayment success
  const handlePaymentSuccess = (order) => {
    toast.success("Purchase successful!");
    router.push("/student/dashboard")
    setPaid(true);

  }

  return (
    <section className="shadow-md border-red-300 md:w-[60%] rounded-2xl">
      <div className="bg-cover bg-center w-full rounded-lg">
        {course?.imagePath && (
          <Image src={course?.imagePath} alt={course?.title} width={1000} height={300} /> 
        )}
        
      </div>
      <div className="flex flex-col p-6 text-center">
        <h1 className="font-semibold text-xl">{course?.title}</h1>
        <p className="line-3">{course?.description}</p>
        
        
        {!enrollementExists && (
          <>
            <h1 className="text-isky_orange text-2xl pt-10 font-semibold">Enroll Now</h1>
            <PayPalScriptProvider options={{
              "clientId": `${process.env.NEXT_PUBLIC_PAYPAL_CLIENT_ID}`,
              
            }}>
              <div className="pt-4">
                {paid ? <h3 className="text-green-500">Payment Successful!</h3> : <PaypalButton amount={course?.price} courseId={course?.course_id} onSuccess={handlePaymentSuccess}  /> }
              </div>
            </PayPalScriptProvider>
          </>
        )}


        {enrollementExists && (
          <div className="text-green-500 text-xl font-bubblegum py-6">You have enrolled to this course!</div>
        )}

        
      </div>
    </section>
  )
}

export default StudentCoursePurchase