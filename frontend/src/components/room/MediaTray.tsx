import { Mic, MicOff } from 'lucide-react'
import type React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'

interface MediaTrayProps {
  audioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
}

const MediaTray: React.FC<MediaTrayProps> = ({ audioEnabled, setAudioEnabled }) => {
  return (
    <div className="flex justify-center items-center p-4 pb-6 backdrop-blur-md">
        <div className="flex gap-4 items-center">
          <Button 
            variant="outline" 
            size="icon" 
            className="rounded-full w-12 h-12 bg-[#1e1e24] border-0 hover:bg-[#2a2a32] transition-all duration-200"
            onClick={() => setAudioEnabled(!audioEnabled)}
          >
            {audioEnabled ? 
              <Mic size={20} className="text-white" /> : 
              <MicOff size={20} className="text-red-400" />
            }
          </Button>
          
          <Button 
            variant="destructive" 
            className="rounded-full w-12 h-12 bg-[#e15b5b] hover:bg-[#d14a4a] border-0 text-white font-medium transition-all duration-200"
          >
            <LogOut />
          </Button>
        </div>
      </div>
  )
}

export default MediaTray