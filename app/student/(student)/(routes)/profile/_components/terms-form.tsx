"use client"
import React, { useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useForm } from 'react-hook-form'
import { Form, FormField, FormControl, FormItem, FormLabel, FormDescription } from '@/components/ui/form'
import toast from 'react-hot-toast'
import { Checkbox } from '@/components/ui/checkbox'
import Link from 'next/link'


const formSchema = z.object({
    terms: z.boolean().default(false).optional()
})

const TermsForm = () => {


    const form = useForm<z.infer <typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            terms: true
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
    <section className="p-4 rounded-md mt-2">
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField 
                    control={form.control}
                    name="terms"
                    render={({field}) => (
                        <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border-0 shadow-none">
                            <FormControl>
                                <Checkbox
                                    checked={field.value}
                                    onCheckedChange={field.onChange}
                                    disabled
                                />
                            </FormControl>
                            <div className="space-y-1 leading-none">
                                <FormLabel>
                                    Agreed to Terms and conditions
                                </FormLabel>
                                <FormDescription>
                                    You have agreed to our terms and conditions. Check
                                    <Link href=""> Terms and Conditions</Link> page.
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

export default TermsForm