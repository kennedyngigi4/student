"use client"

import axios from 'axios';
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormControl, FormItem, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils';
import { useSession } from 'next-auth/react';

interface FullnameFormProps {
    initialData: {
        fullname: string;
    },
    userId: string;
}


const formSchema = z.object({
    fullname: z.string({  required_error: "Full name is required" })
})

const FullnameForm = ({
    initialData, userId
}: FullnameFormProps) => {
    const { data:session } = useSession();
    const [isEditing, setIsEditing  ] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            fullname: initialData.fullname || "",
        }
    });

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async (values: z.infer<typeof formSchema>) => {
        try{
            await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/account/profile/${userId}/`, values, {
                headers: {
                    "Authorization": `Token ${session?.accessToken}`
                }
            });
            console.log(".... Data ")
        } catch(error) {
            console.log(error)
            toast.error("Something went wrong",{ style: { background: "red", color: "#ffffff"}})
        }
    }

  return (
    <section className="bg-slate-100 p-4 rounded-md mt-6">
        <div className="font-medium flex items-center font-bubblegum justify-between">
            Full Name
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing 
                    ? <>Cancel</>
                    : <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit full name
                    </>
                }
            </Button>
        </div>

        {!isEditing && (
            <p className={cn("text-sm font-semibold mt-2", !initialData.fullname && "text-slate-300 italic")}>
                {initialData?.fullname || "No full name"}
            </p>
        )}

        {isEditing && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="fullname"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="text"
                                        placeholder="e.g. John Doe"
                                        className="bg-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button size="sm" disabled={!isValid || isSubmitting}>Save</Button>
                </form>
            </Form>
        )}

    </section>
  )
}

export default FullnameForm