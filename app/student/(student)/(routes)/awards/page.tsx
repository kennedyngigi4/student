"use client"

import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useSession } from 'next-auth/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import Image from 'next/image';
import { TrophyIcon } from 'lucide-react';


const StudentAwardsPage = () => {
    const { data:session } = useSession();
    const [ myAwards, setMyAwards ] = useState([]);

    useEffect(() => {
        axios.get(`${process.env.NEXT_PUBLIC_APIURL}/competitions/students/all_awards`, {
            headers: {
                "Authorization": `Token ${session?.accessToken}`
            }
        }).then((response) => {
            console.log(response.data)
            setMyAwards(response.data);
        })
    }, [session?.accessToken])

    return (
        <section className="p-6 h-screen">
            <div className="flex items-center justify-between gap-x-10">
                <div className="bg-slate-50 py-5 rounded-2xl">
                    <h1 className="font-bubblegum text-2xl font-bold">Badges and Awards</h1>
                    <p className="text-slate-600">Think it. Build it. Change the world! 🚀</p>
                </div>
            </div>

            {myAwards.length <= 0 && (
                <h1 className="text-slate-600 font-bold">No certificates or badges found</h1>
            )}
            
            {myAwards.length > 0 &&(
                <div className="grid md:grid-col-12 col-span-1 gap-3 py-10">
                   
                        {myAwards.map((award) => (
                            <div className="md:col-span-3" key={award?.award_id}>
                                <Card>
                                    <CardHeader>
                                        <CardTitle></CardTitle>
                                    </CardHeader>
                                    <CardContent>
                                        <div>
                                            <TrophyIcon className="h-8 w-8 text-isky_orange" />
                                            <h1 className="text-isky_blue font-bubblegum font-semibold pb-3">{award?.awardname}</h1>
                                            <p className="text-slate-400">{award?.note}</p>
                                        </div>
                                    </CardContent>
                                </Card>
                            </div>
                        ))}
                    
                </div>
            )}
        </section>
    )
}

export default StudentAwardsPage