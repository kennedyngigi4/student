"use client"

import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';

const CourseIdPage = ({
    params
} : { params: Promise<{ courseId: string }> }) => {
    const resolvedParmas = React.use(params);
    const router = useRouter();
    const [ isMounted, setIsMounted ] = useState(false);

    useEffect(() => {
        // router.push("/courses");
        setIsMounted(false);
    }, [])

    if (!isMounted) {
        router.push("/courses");
    }

    return (
        <div>{resolvedParmas?.courseId}</div>
    )
}

export default CourseIdPage