"use client"

import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";

const AnimatedCounter = ({ value } : { value: number }) => {

    const [ count, setCount ] = useState(0);

    useEffect(() => {
        let start = 0;
        const end = value;
        const duration = 1;
        const stepTime = Math.abs(Math.floor(duration/end));
        const timer = setInterval(() => {
            start += 0.5; // Increment by 10
            setCount(start);
            if (start >= end) clearInterval(timer);
        }, stepTime);

        return () => clearInterval(timer);

    }, [value])

    return (
        <motion.div
            className="text-6xl font-bold text-isky_blue font-bubblegum"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.1 }}
        >{count.toLocaleString()}</motion.div>
    )
}

export default AnimatedCounter