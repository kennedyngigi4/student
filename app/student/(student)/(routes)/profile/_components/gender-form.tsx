"use client"

import axios from 'axios';
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select'
import { useSession } from 'next-auth/react';

interface GenderFormProps {
    initialData: {
        gender: string;
    }
    userId: string;
}


const formSchema = z.object({
    gender: z.string({  required_error: "Gender is required" })
})

const GenderForm = ({
    initialData, userId
}: GenderFormProps) => {
    const { data: session } = useSession();
    const [isEditing, setIsEditing  ] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "",
        }
    });

    const { isValid, isSubmitting } = form.formState;

    const onSubmit = async(values: z.infer<typeof formSchema>) => {
        try {
            await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/account/profile_update/${userId}`, values, {
                headers: {
                    "Authorization": `Token ${session?.accessToken}`
                }
            }).then((response) => {
                console.log(response.data);
            })
        } catch (error) {
            console.log(error)
            toast.error("Something went wrong", { style: { background: "red", color: "#ffffff" } })
        }
    }

  return (
    <section className="bg-slate-100 p-4 rounded-md mt-6">
        <div className="font-medium flex items-center font-bubblegum justify-between">
            Gender
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing 
                    ? <>Cancel</>
                    : <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit gender
                    </>
                }
            </Button>
        </div>

        {!isEditing && (
            <p className={cn("text-sm font-semibold mt-2", !initialData.gender && "text-slate-300 italic")}>
                {initialData?.gender || "No gender"}
            </p>
        )}

        {isEditing && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="gender"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className='w-full bg-white'>
                                            <SelectValue placeholder="Gender" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="Female">Female</SelectItem>
                                            <SelectItem value="Male">Male</SelectItem>
                                            <SelectItem value="Not say">Not Say</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <Button type="submit" size="sm" disabled={!isValid || isSubmitting}>Save</Button>
                </form>
            </Form>
        )}

    </section>
  )
}

export default GenderForm