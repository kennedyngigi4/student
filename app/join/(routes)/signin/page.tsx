"use client"

import React, { useEffect, useState } from 'react'
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from 'react-hook-form';
import {
    Form, FormField, FormLabel, FormControl, FormItem, FormMessage
} from "@/components/ui/form"
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import { signIn, useSession } from 'next-auth/react';
import toast  from 'react-hot-toast';
import { Eye, EyeOff } from 'lucide-react';


const formSchema = z.object({
    email: z.string({ required_error: "Email address is required" })
            .min(1, { message: "Email is required"})
            .email({ message: "Invalid email address" }),
    password: z.string({ required_error: "Password is required" })
            .min(1, { message: "Password must be more than 6 characters" })
            .max(32, { message: "Password must be less than 32 characters" })
})

const SigninPage = () => {
    const router = useRouter();
    const { status } = useSession();
    const [ isAuthenticating, setIsAuthenticating ] = useState("Sign in"); 
    const [ passwordView, setPasswordView ] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
            password: "",
        }
    });

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema> ) => {
        try{
            setIsAuthenticating("Authenticating ...");
            const response = await signIn('credentials', { email: values.email, password: values.password, redirect: false });
            if (response.error) {
                setIsAuthenticating("Sign in");
                toast.error("Email or Password is incorrect")
            } else {
                console.log()
                toast.success("Sign in successful");
                router.push('/student/dashboard');
            }
        } catch{
            toast.error("Something went wrong")
        }
    }

    useEffect(() => {
        if (status == "authenticated") {
            router.push("/student/dashboard");
        } 
    }, [status, router])

    

    return (
        <section className="grid md:grid-cols-12 grid-cols-12 space-x-14">
            <div className="col-span-6 max-md:col-span-12 bg-[url(/images/others/login.jpeg)] bg-cover bg-center">
                {/* <Image src="/images/others/login.jpeg" width={450} height={300} className="" alt="Frequently Asked Questions" /> */}
            </div>
            <div className="col-span-6 max-md:col-span-12">
                <div className="pt-8">
                    <h3 className="font-bold font-bubblegum text-3xl pt-4 text-isky_orange"><span className="transform rotate-45">S</span>ign in</h3>
                    <h3>Welcome back to <span className="font-semibold text-isky_orange">ISKY TECH</span> account</h3>
                </div>
                <div className="w-[70%] py-11">

                    <Form {...form}>
                        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-3">
                            <FormField
                                control={form.control}
                                name="email"
                                render={({ field }) => {
                                    return <FormItem>
                                        <FormLabel>Email</FormLabel>
                                        <FormControl>
                                            <Input
                                                type="email"
                                                placeholder="e.g. johndoe@email.com"
                                                {...field} />
                                        </FormControl>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>;
                                }}
                            />

                            <FormField 
                                control={form.control}
                                name="password"
                                render={({field}) => {
                                    return <FormItem>
                                        <FormLabel>Password</FormLabel>
                                        <FormControl>
                                            <div className="relative">
                                                <Input 
                                                    type={passwordView ? "text" : "password"}
                                                    placeholder="*********"
                                                    {...field}
                                                />
                                                {passwordView ? (
                                                   <Eye 
                                                    className="absolute right-3 top-2 z-50 cursor-pointer text-gray-400"
                                                    onClick={() => {
                                                        setPasswordView(!passwordView)
                                                    }}
                                                   />
                                                ) : (
                                                    <EyeOff
                                                        className="absolute right-3 top-2 z-50 cursor-pointer text-gray-400"
                                                        onClick={() => {
                                                            setPasswordView(!passwordView)
                                                        }}
                                                    />
                                                )}
                                                
                                            </div>
                                        </FormControl>
                                        <FormMessage className='text-red-600' />
                                    </FormItem>
                                }}
                            />
                            <div className="mt-3 text-right">
                                <Link className="text-isky_blue font-bold" href="/join/reset-password">Forgot Password?</Link>
                            </div>
                            <div className="mt-3 text-center">
                                <Button disabled={!isValid || isSubmitting} className="bg-isky_orange hover:bg-isky_blue py-5 text-lg px-28 rounded-3xl font-lato font-bold">{isAuthenticating}</Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-3">
                        <p className=" text-black py-5 text-lg font-lato font-normal">You do not have an account? <Link className="text-isky_blue font-bold" href="/join/signup">Sign up</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default SigninPage