"use client"

import React from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage, FormDescription } from '@/components/ui/form';
import axios from 'axios';
import Link from 'next/link';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';


const formSchema = z.object({
    name: z.string({ required_error: "Project name is required" })
        .min(2, { message: "Project name must be at least 2 characters" })
})

const CreateProject = () => {
    const { data: session } = useSession();
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    });

    const { isValid, isSubmitting } = form.formState;

    const handleTitleSubmit = async (values: z.infer<typeof formSchema>) => {
        try {
            await axios.post(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/projects/`, values, {
                headers: {
                    "Authorization": `Token ${session?.accessToken}`
                }
            }).then((response) => {
                console.log(response.data)
                if(response.data["status_code"] == 201){
                    toast.success("Project created successfully");
                    router.push(`/student/projects/${response.data["project_id"]}`)
                }
            })
        } catch(error) {
            toast.error("Something went wrong");
        }
    }

  return (
    <section className="max-w-5xl mx-auto my-auto flex flex-col items-center justify-center h-full p-6">
        <div className="h-screen">
            <h1 className="text-2xl font-semibold">
                Name your project
            </h1>
            <p className="text-sm text-slate-600">
                What would you like to name your project? Do not worry, you can change this later.
            </p>

            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleTitleSubmit)} className="space-y-8 mt-8">
                    <FormField
                        control={form.control}
                        name="name"
                        render={({ field }) => (
                            <FormItem>
                                <FormLabel>Project name</FormLabel>
                                <FormControl>
                                    <Input
                                        type="text"
                                        disabled={isSubmitting}
                                        className="bg-white"
                                        placeholder="e.g. '3D Space shooter game'"
                                        {...field}
                                    />
                                </FormControl>
                                <FormDescription>
                                    What have you developed?
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <div>
                        <Link href="/courses"><Button variant="ghost" type="button">Cancel</Button></Link>
                        <Button type="submit" disabled={!isValid || isSubmitting}>Continue</Button>
                    </div>
                </form>
            </Form>

        </div>
    </section>
  )
}

export default CreateProject