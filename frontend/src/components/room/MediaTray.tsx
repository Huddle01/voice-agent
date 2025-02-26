import { MoreHorizontal } from 'lucide-react'
import { Maximize2, Mic, MicOff } from 'lucide-react'
import type React from 'react'
import { Button } from '../ui/button'
import { Video } from 'lucide-react'
import { VideoOff } from 'lucide-react'

interface MediaTrayProps {
  videoEnabled: boolean
  audioEnabled: boolean
  setVideoEnabled: (enabled: boolean) => void
  setAudioEnabled: (enabled: boolean) => void
}

const MediaTray: React.FC<MediaTrayProps> = ({ videoEnabled, audioEnabled, setVideoEnabled, setAudioEnabled }) => {
  return (
    <div className="flex justify-center items-center p-4 pb-6 backdrop-blur-md">
        <div className="flex gap-4 items-center">
          <Button
            variant="outline" 
            size="icon" 
            className="rounded-md w-14 h-14 bg-[#1e1e24] border-0 hover:bg-[#2a2a32] transition-all duration-200"
            onClick={() => setVideoEnabled(!videoEnabled)}
          >
            {videoEnabled ? 
              <Video size={20} className="text-white" /> : 
              <VideoOff size={20} className="text-red-400" />
            }
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-md w-14 h-14 bg-[#1e1e24] border-0 hover:bg-[#2a2a32] transition-all duration-200"
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? 
              <Mic size={20} className="text-white" /> : 
              <MicOff size={20} className="text-red-400" />
            }
          </Button>
          
          <Button 
            variant="destructive" 
            className="rounded-md px-8 py-6 bg-[#e15b5b] hover:bg-[#d14a4a] border-0 text-white font-medium transition-all duration-200"
          >
            End call
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-md w-14 h-14 bg-[#1e1e24] border-0 hover:bg-[#2a2a32] transition-all duration-200"
          >
            <Maximize2 size={20} className="text-white" />
          </Button>
          
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-md w-14 h-14 bg-[#1e1e24] border-0 hover:bg-[#2a2a32] transition-all duration-200"
          >
            <MoreHorizontal size={20} className="text-white" />
          </Button>
        </div>
      </div>
  )
}

export default MediaTray