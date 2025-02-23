"use client"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { ColumnDef } from "@tanstack/react-table"
import { Book, Files } from "lucide-react"
import Link from "next/link"

// This type is used to define the shape of our data.
// You can use a Zod schema here if you want.
export type Payment = {
    id: string
    amount: number
    status: "pending" | "processing" | "success" | "failed"
    email: string
}

export const columns: ColumnDef<Payment>[] = [
    {
        accessorKey: "course_title",
        header: "Course",
        cell: ({row}) => {
            const title = row.getValue("course_title")
            return (
                <p><Book className="h-4 w-4 text-isky_blue" /> {title}</p>
            )
        }
    },
    {
        accessorKey: "course_category",
        header: "Category",
        cell: ({ row }) => {
            const category = row.getValue("course_category")
            return (
                <p><Files className="h-4 w-4 text-isky_blue" /> {category}</p>
            )
        }
    },
    {
        accessorKey: "is_complete",
        header: "Completion",
        cell: ({ row }) => {
            const isComplete = row.getValue("is_complete")

            return (
                <p className={cn("flex text-isky_orange font-semibold text-xs", isComplete && "text-green-800")}>{isComplete ? "Completed" : "In progress"}</p>
            );
        }
    },
    {
        header: "Action",
        cell: ({row}) => {
            const { id, course } = row.original;
            const isComplete = row.getValue("is_complete");

            return (
                <Link href={`/student/courses/${course}/${id}/`}>
                    {isComplete
                        ? <>
                            <p className="font-semibold text-sm text-green-800">Details</p>
                        </>
                        : <>
                            <Button variant="outline" size="sm">Continue</Button>
                        </>
                    }
                </Link>
            )
        }
    },
]
