"use client"

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { signOut } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import FullnameForm from './_components/fullname-form';
import { Camera, LogOutIcon } from 'lucide-react';

import { useSession } from 'next-auth/react';
import EmailForm from './_components/email-form';
import PhoneForm from './_components/phone-form';
import GenderForm from './_components/gender-form';
import AgeForm from './_components/age-form';
import TermsForm from './_components/terms-form';
import MarketingForm from './_components/marketing-form';


const ProfilePage = () => {
    const { data: session } = useSession();
    const [ user, setUser ] = useState({});

    const logOut = async () => {
        await signOut();
    }


    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/account/profile/`, {
            headers: {
                'Authorization': `Token ${session?.accessToken}`
            }
        }).then((response) => {
            setUser(response.data)
        })
    }, [session?.accessToken])


    return (
        <section className="p-6 grid md:grid-cols-12 grid-cols-12">
            <div className="col-span-12 md:col-span-4">
                <div className="h-[150px] w-[150px] mx-auto bg-isky_blue rounded-full flex items-center justify-center">
                    <div className="relative">
                        <div className="absolute">
                            <Camera className="h-12 w-12 text-white " />
                        </div>
                        <h1 className="text-slate-400 font-semibold text-6xl">{session?.user?.name?.slice(0, 1)}</h1>
                    </div>
                </div>
            </div>
            <div className="col-span-12 md:col-span-8 bg-white p-6 rounded-lg">
                <h1 className="font-semibold text-2xl font-bubblegum">Your profile data</h1>

                <div>
                    <EmailForm
                        initialData={user}
                        userId={user?.uid}
                    />

                    <FullnameForm 
                        initialData={user}
                        userId={user?.uid}
                    />

                    <PhoneForm
                        initialData={user}
                        userId={user?.uid}
                    />


                    <div className="grid md:grid-cols-12 grid-cols-12 gap-6">
                        <div className="col-span-12 md:col-span-6">
                            <GenderForm 
                                initialData={user}
                                userId={user?.uid}
                            />
                        </div>
                        <div className="col-span-12 md:col-span-6">
                            <AgeForm
                                initialData={user}
                                userId={user?.uid}
                            />
                        </div>
                    </div>

                    <MarketingForm />

                    <TermsForm />

                </div>
                

                
                
            </div>

            <div className="py-6">
                <Button variant="destructive" onClick={logOut}><LogOutIcon className="h-4 w-4 mr-1" /> Log out </Button>
            </div>
            
        </section>
    )
}

export default ProfilePage