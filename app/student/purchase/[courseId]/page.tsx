"use client"

import React, { useEffect, useState, use } from 'react'
import axios from 'axios';
import toast from 'react-hot-toast';
import { Button } from '@/components/ui/button';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Image from 'next/image';


type Params = Promise<{ courseId: string }>;
const StudentCoursePurchase = (props: { params: Params }) => {
  const { data:session } = useSession();
  const resolvedParmas = use(props.params);
  const router = useRouter();
  const [ course, setCourse ] = useState({});

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/course/${resolvedParmas.courseId}`)
    .then((response) => {
      setCourse(response.data);
    }).catch(() => {
      toast.error("Something went wrong");
    });
    
  }, [resolvedParmas.courseId]);


  const handlePayments = async() => {
    const transactionId = crypto.randomUUID();

    const paymentData = {
      transaction_id: transactionId,
      amount: course?.price,
      course_id: course?.course_id,
      user_id: session?.user?.id,
      payment_method: "Credit Card"
    }


    await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/payments/student/payment`, paymentData, {
      headers: {
        'Authorization': `Token ${session?.accessToken}`
      }
    }).then((response) => {
      console.log(response.data)
      if(response.data === 201){
        toast.success("Purchase successful!");
        router.push("/student/dashboard")
      } if (response.data === 409) {
        toast.error("You have enrolled to this course already.")
      } else {
        toast.error("Something went wrong");
      }
      
    }).catch((error) => {
      toast.error("Something went wrong");
    })


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
        
        <div className="w-[50%] mx-auto py-8">
          <Button className="w-full bg-green-500 font-semibold" onClick={handlePayments}>Enroll now</Button>
        </div>
        
      </div>
    </section>
  )
}

export default StudentCoursePurchase