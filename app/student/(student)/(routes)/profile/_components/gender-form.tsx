"use client"
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import toast from 'react-hot-toast'
import { Pencil } from 'lucide-react'
import { cn } from '@/lib/utils'

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
    initialData
}: GenderFormProps) => {

    const [isEditing, setIsEditing  ] = useState(false);

    const toggleEdit = () => setIsEditing((current) => !current);

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            gender: "",
        }
    });

    const onSubmit = (values: z.infer<typeof formSchema>) => {
        try{
            console.log(values);
        } catch {
            toast.error("Something went wrong",{ style: { background: "red", color: "#ffffff"}})
        }
    }

  return (
    <section className="bg-slate-100 p-4 rounded-md mt-6">
        <div className="font-medium flex items-center justify-between">
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
                                    <Input 
                                        type="email"
                                        placeholder="e.g. johndoe@email.com"
                                        className="bg-white"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </form>
            </Form>
        )}

    </section>
  )
}

export default GenderForm