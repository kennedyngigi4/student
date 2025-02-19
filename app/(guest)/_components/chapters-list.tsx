"use client"

import React from 'react';
import {
    Accordion,
    AccordionContent,
    AccordionItem,
    AccordionTrigger,
} from "@/components/ui/accordion";

interface ChaptersListProps {
    initialData: any[];
}


const ChaptersList = ({
    initialData
}: ChaptersListProps) => {
    return (
        <div className="py-8">
            <h1 className="text-2xl font-semibold text-isky_blue">Course content</h1>

            <div className="pt-5">
                <p>{initialData?.length} {initialData?.length === 1 ? "section" : "sections"}</p>
            </div>
            <div className="border px-5">
                {initialData?.map((chapter: any) => (
                    <Accordion key={chapter.chapter_id} type="single" collapsible className="w-full">
                        <AccordionItem value={chapter.chapter_id}>
                            <AccordionTrigger className="text-isky_blue font-semibold">{chapter.title}</AccordionTrigger>
                            <AccordionContent>
                                {chapter.description}
                            </AccordionContent>
                        </AccordionItem>
                    </Accordion>
                ))}
            </div>
        </div>
    )
}

export default ChaptersList