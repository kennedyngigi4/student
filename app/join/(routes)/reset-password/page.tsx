"use client"

import React from 'react'
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


const formSchema = z.object({
    email: z.string({ required_error: "Email address is required" })
        .min(1, { message: "Email is required" })
        .email({ message: "Invalid email address" }),
})

const ResetPasswordPage = () => {
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            email: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        console.log(values)
    }

    return (
        <section className="grid md:grid-cols-12 grid-cols-12 space-x-14">
            <div className="col-span-6 max-md:col-span-12 bg-[url(/images/others/login.jpeg)] bg-cover bg-center">
                
            </div>
            <div className="col-span-6 max-md:col-span-12 py-16">
                <div className="pt-8">
                    <h3 className="font-bold text-3xl pt-4 font-bubblegum text-isky_orange">Forgot Password</h3>
                    <h3>Enter email and receive the reset password link</h3>
                </div>
                <div className="w-[70%] py-9">

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

                            <div className="mt-3 text-center">
                                <Button className="bg-isky_orange hover:bg-isky_blue py-5 text-lg px-28 rounded-3xl font-lato font-bold">RESET PASSWORD</Button>
                            </div>
                        </form>
                    </Form>
                    <div className="mt-3">
                        <p className=" text-black py-5 text-lg font-lato font-normal">Already having an account? <Link className="text-isky_blue font-bold" href="/join/signin">Sign in</Link></p>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default ResetPasswordPage