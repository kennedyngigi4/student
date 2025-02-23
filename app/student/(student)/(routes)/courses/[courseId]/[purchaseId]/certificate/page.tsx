"use client"
import React, { useEffect, useRef } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';

const CertificateGenerationPage = () => {
    const { data:session } = useSession();
    

    return (
        <>
            <section className="p-6 min-h-screen w-[70%] mx-auto">
                
                <div className="flex flex-col bg-white border rounded-xl p-6 mt-10 items-center justify-center space-y-8">
                    <div className="flex flex-col items-center">
                        <Image src="/images/icons/reward.png" width={150} height={150} alt="Congratulations" />
                        
                        <h1 className="text-2xl font-semibold pt-10 text">Congratulations {session?.user?.name}</h1>
                        <p>For reaching this far!</p>
                    </div>
                    
                    <p className="md:w-[70%] text-center">ISKY TECH is honoured to award you a certificate of completion in the course.</p>
                    
                    <Button variant="" className="bg-green-500" >Certificate has been Generated</Button>
                </div>
                
            </section>
            
        </>
    )
}

export default CertificateGenerationPage