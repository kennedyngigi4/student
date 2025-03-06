"use client"

import axios from 'axios';
import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import toast from 'react-hot-toast';
import { Pencil } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { useSession } from 'next-auth/react';

interface AgeFormProps {
    initialData: {
        age_range: string;
    }
    userId: string;
}


const formSchema = z.object({
    age_range: z.string({ required_error: "Age range is required" })
})

const AgeForm = ({
    initialData, userId
}: AgeFormProps) => {   
    const { data:session } = useSession();
    const [isEditing, setIsEditing  ] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            age_range: "",
        }
    });

    const {  isValid, isSubmitting } = form.formState;

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
        <div className="font-medium flex items-center  font-bubblegum justify-between">
            Age
            <Button onClick={toggleEdit} variant="ghost">
                {isEditing 
                    ? <>Cancel</>
                    : <>
                        <Pencil className="h-4 w-4 mr-2" />
                        Edit Age
                    </>
                }
            </Button>
        </div>

        {!isEditing && (
            <p className={cn("text-sm font-semibold mt-2", !initialData.age_range && "text-slate-300 italic")}>
                {initialData?.age_range || "No age range"}
            </p>
        )}

        {isEditing && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                    <FormField 
                        control={form.control}
                        name="age_range"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                                        <SelectTrigger className='w-full bg-white'>
                                            <SelectValue placeholder="Age Group" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="6 - 8">6 - 8 Years</SelectItem>
                                            <SelectItem value="9 - 12">9 - 12 Years</SelectItem>
                                            <SelectItem value="13 - 15">13 - 15 Years</SelectItem>
                                            <SelectItem value="16 - 18">16 - 18 Years</SelectItem>
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

export default AgeForm