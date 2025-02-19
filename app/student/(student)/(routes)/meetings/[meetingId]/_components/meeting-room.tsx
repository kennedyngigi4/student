"use client"

type CallLayoutType = 'grid' | 'speaker-left' | 'speaker-right'

import { CallControls, PaginatedGridLayout, SpeakerLayout } from '@stream-io/video-react-sdk'
import React, { useState } from 'react'

const MeetingRoom = () => {

    const [layout, setLayout] = useState<CallLayoutType>('speaker-left')

    const CallLayout = () => {
        switch(layout){
            case 'grid':
                return <PaginatedGridLayout />
            case 'speaker-right':
                return <SpeakerLayout participantsBarPosition="left" />
            default:
                return <SpeakerLayout participantsBarPosition="right" />
        }
    }

    return (
        <section className="relative h-screen w-full overflow-hidden p-4">
            <div className="relative flex size-full items-center justify-center">
                <div className="flex size-full max-w-[1000px] items-center">
                    <CallLayout />
                </div>
                <div className="fixed bottom-0 flex w-full items-center justify-center gap-5">
                    <CallControls />
                </div>
            </div>
        </section>
    )
}

export default MeetingRoom