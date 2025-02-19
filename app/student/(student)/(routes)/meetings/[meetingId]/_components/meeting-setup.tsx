"use client"

import { Button } from '@/components/ui/button';
import { DeviceSettings, useCall, VideoPreview } from '@stream-io/video-react-sdk'
import React, { useEffect, useState } from 'react'

const MeetingSetup = ({ setIsSetupComplete }: { setIsSetupComplete: (value: boolean) => void }) => {

    const [isMicCamToggledOn, setisMicCamToggledOn ] = useState(false);
    const call = useCall();


    if(!call){
        throw new Error("Usecall must be used within StreamCall component");
    }

    useEffect(() => {
        if(isMicCamToggledOn){
            call?.camera.disable();
            call?.microphone.disable();
        } else {
            call?.camera.enable();
            call?.microphone.enable();
        }
    }, [isMicCamToggledOn, call?.camera, call?.microphone]);

    return (
        <div className="flex min-h-screen w-full flex-col items-center justify-center gap-3 my-8">
            <h1 className="text-3xl font-semibold">Setup</h1>
            <h6 className="text-xl font-bold">Ensure your camera and microphone are setup.</h6>
            <VideoPreview />
            <div className="flex h-16 items-center justify-center gap-3">
                <label className="items-center justify-center gap-2 font-medium">
                    <input 
                        type="checkbox"
                        checked={isMicCamToggledOn}
                        onChange={(e) => setisMicCamToggledOn(e.target.checked)}
                    />
                    &nbsp; Join with mic and camera off
                </label>
                <DeviceSettings />
            </div>
            <Button className="rounded-md bg-green-500 px-4 py-2.5" 
                onClick={() => {
                    call.join();
                    setIsSetupComplete(true);
                }}
            >
                Join meeting
            </Button>
        </div>
    )
}

export default MeetingSetup