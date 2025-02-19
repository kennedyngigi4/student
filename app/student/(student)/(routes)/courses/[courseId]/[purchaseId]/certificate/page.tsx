"use client"
import React from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';

const CertificateGenerationPage = () => {
    const { data:session } = useSession();
    return (
        <section className="p-6 min-h-screen w-[70%] mx-auto">
            <div className="flex flex-col bg-white border rounded-xl p-6 items-start space-y-6">
                <div className="flex flex-col">
                    <h1 className="text-lg font-semibold">Hello, {session?.user?.name}</h1>
                    <p>Congratulations, for reaching this far!</p>
                </div>

                <p>ISKY TECH is honoured to award you a certificate of completion in the course.</p>

                <Button variant="" className="bg-green-500" >Generate Certificate</Button>
            </div>
            
        </section>
    )
}

export default CertificateGenerationPage