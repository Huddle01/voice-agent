import React, { useState, useEffect } from 'react'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Mic, MicOff, Video, VideoOff, Maximize2, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import MediaTray from '@/components/room/MediaTray'

const RoomPage = () => {
  // Mock data for participants - you would replace this with actual data
  const [participants, setParticipants] = useState([
    { id: '1', name: 'User 1', isSpeaking: true, avatar: null },
    { id: '2', name: 'User 2', isSpeaking: false, avatar: null },
  ]);

  const [audioEnabled, setAudioEnabled] = useState(true);
  const [videoEnabled, setVideoEnabled] = useState(true);
  const [screenShareEnabled, setScreenShareEnabled] = useState(false);
  const [aiSpeaking, setAiSpeaking] = useState(false);
  
  // Toggle AI speaking for demo purposes
  useEffect(() => {
    const interval = setInterval(() => {
      setAiSpeaking(prev => !prev);
    }, 3000);
    return () => clearInterval(interval);
  }, []);
  
  return (
    <section className="flex flex-col h-screen text-white">
      <div className="absolute top-4 left-0 right-0 flex justify-center z-10">
        <div className="bg-[#1a1a1a] px-5 py-2.5 rounded-full flex items-center shadow-md">
          <h1 className="text-sm font-medium text-gray-200">Discussing Project Requirements</h1>
        </div>
      </div>
      
      <div className="relative flex-grow m-4 overflow-hidden">
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <div className={cn(
            "flex flex-col items-center justify-center"
          )}>
            <div className={cn(
              "relative w-28 h-28 mb-4 transition-all duration-300",
            )}>
              {aiSpeaking && (
                <div className="absolute inset-0 rounded-full animate-ping opacity-20 bg-blue-500 -z-10" />
              )}
              
              <div className={cn(
                "w-full h-full rounded-full bg-gradient-to-br from-[#3a3a3f] to-[#252529] flex items-center justify-center shadow-lg transition-all duration-300",
                aiSpeaking && "from-[#223747] to-[#152736] shadow-blue-900/20"
              )}>
                <svg width="44" height="44" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="8"
                    stroke={aiSpeaking ? "#61dafb" : "#9c9ca4"} 
                    strokeWidth="1.5"
                  />
                  <circle 
                    cx="12" 
                    cy="12" 
                    r="3"
                    fill={aiSpeaking ? "#61dafb" : "#9c9ca4"} 
                    fillOpacity={aiSpeaking ? "0.5" : "0.3"}
                  />
                  {aiSpeaking && (
                    <>
                      <path 
                        d="M12 2L12 4M12 20L12 22M2 12L4 12M20 12L22 12" 
                        stroke="#61dafb" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                      />
                      <path 
                        d="M4 4L6 6M18 18L20 20M4 20L6 18M18 6L20 4" 
                        stroke="#61dafb" 
                        strokeWidth="1.5" 
                        strokeLinecap="round"
                        strokeDasharray="12"
                        strokeDashoffset="24"
                        className="opacity-70"
                      />
                    </>
                  )}
                </svg>
              </div>
              
              <div className={cn(
                "absolute inset-0 rounded-full border-2 border-blue-300/5",
                aiSpeaking && "border-blue-400/20"
              )} />
            
            </div>
          </div>
        </div>

        <div className="absolute right-8 bottom-1/3 flex flex-col gap-6">
            <div className="aspect-video min-w-16 min-h-16 bg-[#2b2b31] rounded-lg flex items-center justify-center">
              <Avatar className="w-12 h-12">
                <AvatarImage src="" />
                <AvatarFallback className="bg-[#3a3a3f] text-gray-200">
                  <span className="text-lg font-medium">1</span>
                </AvatarFallback>
              </Avatar>
            </div>
            <div>
          </div>
        </div>

      </div>

      <MediaTray
        videoEnabled={videoEnabled}
        audioEnabled={audioEnabled}
        setVideoEnabled={setVideoEnabled}
        setAudioEnabled={setAudioEnabled}
      />
    </section>
  )
}

export default RoomPage