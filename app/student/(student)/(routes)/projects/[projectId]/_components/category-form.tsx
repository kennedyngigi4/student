"use client"

import React, { useState } from 'react';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { Form, FormField, FormControl, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import toast from 'react-hot-toast';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import axios from 'axios';
import { Pencil } from 'lucide-react';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { cn } from '@/lib/utils';


interface CategoryFormProps {
    initialData: {
        category: string;
    }
    projectId: string;
}

const formSchema = z.object({
    category: z.string({ required_error: "Project category is required" })
})

const CategoryForm = ({ initialData, projectId }: CategoryFormProps) => {
    const { data: session } = useSession();
    const [isEditing, setIsEditing] = useState(false);

    const form = useForm<z.infer<typeof formSchema>>({
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
                if (response.data == 200) {
                    toast.success("Project updated");
                    toggleEditing();
                    location.reload();
                }
            })
        } catch (error) {
            toast.error("Something went wrong")
        }
    }


    const categories = [
        {
            id: "1",
            name: 'Game Design',
        },
        {
            id: "2",
            name: 'Robotics',
        },
        {
            id: "3",
            name: 'Web Development',
        },
        {
            id: "4",
            name: 'Digital Art',
        },
        {
            id: "5",
            name: 'Cyber Security',
        },
        {
            id: "6",
            name: 'App Development',
        },
        {
            id: "7",
            name: '3D Printing',
        },
        {
            id: "8",
            name: 'Computer Science',
        },
        {
            id: "9",
            name: 'Graphic Design'
        },
        {
            id: "10",
            name: "Animations"
        },

    ]


    return (
        <section className="p-4 bg-slate-100 rounded-md border">
            <div className="flex items-center justify-between font-medium">
                Project category

                <Button onClick={toggleEditing} variant="ghost">
                    {isEditing ? (
                        <>Cancel</>
                    ) : (
                        <>
                            <Pencil className="w-4 h-4 mr-2" />
                            Edit category
                        </>
                    )
                    }
                </Button>
            </div>

            {!isEditing && (
                <p className={cn("text-sm py-2", !initialData?.category && "italic text-slate-400")}>{ !initialData?.category ? <>No category</> : <>{initialData?.category}</> }</p>
            )}


            {isEditing && (
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-3">
                        <FormField
                            control={form.control}
                            name="category"
                            render={({ field }) => (
                                <FormItem>
                                    <FormControl>
                                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                                            <SelectTrigger>
                                                <SelectValue placeholder="Category" />
                                            </SelectTrigger>
                                            <SelectContent className="bg-white">
                                                {categories.map((category) => (
                                                    <div key={category.id}>
                                                        <SelectItem value={category.name}>{category.name}</SelectItem>
                                                    </div>
                                                ))}
                                            </SelectContent>
                                        </Select>
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

export default CategoryForm