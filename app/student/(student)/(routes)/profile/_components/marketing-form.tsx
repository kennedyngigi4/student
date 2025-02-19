"use client"
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription } from '@/components/ui/form'
import toast from 'react-hot-toast'
import { Checkbox } from '@/components/ui/checkbox'


const formSchema = z.object({
    marketing: z.boolean().default(false).optional()
})

const MarketingForm = () => {

    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            marketing: false
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
    <section className="p-4 rounded-md mt-4">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    control={form.control}
                      name="marketing"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-0 shadow-none">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Receive newletters and notifications
                                </FormLabel>
                                <FormDescription>
                                    You can subscribe to get newsletters and notifications from our marketing team.
                                </FormDescription>
                            </div>
                        </FormItem>
                    )}
                />
            </form>
        </Form>
    </section>
  )
}

export default MarketingForm