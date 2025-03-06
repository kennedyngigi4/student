"use client"

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Pencil } from 'lucide-react';


interface NameFormProps {
    initialData: {
        name: string;
    }
    projectId: string;
}

const formSchema = z.object({
    name: z.string({ required_error: "Project name is required" })
})

const NameForm = ({ initialData, projectId }: NameFormProps) => {
    const { data:session } = useSession();
    const [ isEditing, setIsEditing ] = useState(false);

    const form = useForm<z.infer <typeof formSchema >>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData,
    })

    const toggleEditing = () => setIsEditing((current) => !current);

    const { isValid, isSubmitting } = form.formState;

    const handleSubmit = async (values: z.infer<typeof formSchema>) => {
        console.log(projectId);
       try {
        await axios.patch(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/projects/${projectId}/`, values, {
            headers: {
                "Authorization": `Token ${session?.accessToken}`
            }
        }).then((response) => {
            if(response.data == 200){
                toast.success("Project updated");
                toggleEditing();
                location.reload();
            }
        })
       } catch(error) {
        toast.error("Something went wrong")
       }
    }


  return (
    <section className="p-4 bg-slate-100 rounded-md border">
        <div className="flex items-center justify-between font-medium">
            Project name

            <Button onClick={toggleEditing} variant="ghost">
                {isEditing  ? ( 
                        <>Cancel</> 
                    ) : ( 
                    <>
                        <Pencil className="w-4 h-4 mr-2" />
                        Edit name
                    </> 
                )
                }
            </Button>
        </div>

        {!isEditing && (
            <p className="text-sm py-2">{initialData?.name}</p>
        )}


        {isEditing && (
            <Form {...form}>
                <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                    <FormField 
                        control={form.control}
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormControl>
                                    <Input 
                                        type="text"
                                        disabled={isSubmitting}
                                        placeholder="e.g. 'Space Shooter Game'"
                                        className="bg-white"
                                        {...field}
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <div>
                        <Button type="submit" disabled={!isValid || isSubmitting} size="sm">Save</Button>
                    </div>
                </form>
            </Form>
        )}

    </section>
  )
}

export default NameForm