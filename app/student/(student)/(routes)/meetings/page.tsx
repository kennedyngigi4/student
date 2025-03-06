"use client"

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import axios from 'axios'
import { Users } from 'lucide-react'
import { useSession } from 'next-auth/react'
import Link from 'next/link'
import React, { useEffect, useState } from 'react'

const LivePage = () => {
  const { data:session } = useSession();
  const [ upcomingOnlineClasses, setUpcomingOnlineClasses ] = useState([]);

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_APIURL}/courses/student/upcoming_classes`, {
      headers: {
        "Authorization": `Token ${session?.accessToken}`
      }
    }).then((response) => {
      setUpcomingOnlineClasses(response.data)
    })
  },[]);

  return (
    <section className="p-6 h-screen">
      <div className="">
        <h1 className="text-3xl font-semibold font-bubblegum">Upcoming Online Classes</h1>
      </div>

      {upcomingOnlineClasses.length > 0 ? (
        <div className="grid lg:grid-cols-4 grid-cols-1 pt-6 gap-4">
          {upcomingOnlineClasses.map((onlineClass) => (
            <div key={onlineClass?.class_id}>
              <Link href={`/student${onlineClass?.sharedLink}`}>
                <Card>
                  <CardHeader>
                    <CardTitle>
                      <Users className="h-8 w-8 text-isky_orange" />
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="">
                      <h1 className="font-semibold text-isky_orange font-bubblegum truncate">{onlineClass?.coursetitle}</h1>
                      <p className="font-semibold text-sm text-slate-400">{new Date(onlineClass?.schedule).toLocaleString()}</p>
                      <p className="pt-3 text-slate-500 line-clamp-2">{onlineClass?.description}</p>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            </div>
          ))}
        </div>
      ) : ( 
        <div className="w-full text-center py-4">
          <p className="text-xl font-bubblegum">You do not have any upcoming class at the moment</p>
        </div>
      )} 
    </section>
  )
}

export default LivePage