import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Users } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const LivePage = () => {
  return (
    <section className="p-6 h-screen">
      <div className="">
        <h1 className="text-3xl font-semibold font-bubblegum">Upcoming Online Classes</h1>
      </div>

      <div className="grid md:grid-cols-4 grid-cols-1 pt-6 gap-4">
        <div>
          <Link href="/student/meetings/1156882b-2530-41d3-af93-18b82840e987">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Users className="h-8 w-8" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="">
                  <h1 className="font-semibold truncate">Digital Literacy Online Class</h1>
                  <p className="font-semibold text-sm text-slate-500">26 Feb 21:00</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
        <div>
          <Link href="/student/meetings/1156882b-2530-41d3-af93-18b82840e987">
            <Card>
              <CardHeader>
                <CardTitle>
                  <Users className="h-8 w-8" />
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="">
                  <h1 className="font-semibold truncate">3D Printing Online Class</h1>
                  <p className="font-semibold text-sm text-slate-500">26 Feb 21:00</p>
                </div>
              </CardContent>
            </Card>
          </Link>
        </div>
      </div>
    </section>
  )
}

export default LivePage