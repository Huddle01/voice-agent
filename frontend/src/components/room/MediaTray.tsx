import { Mic, MicOff } from 'lucide-react'
import type React from 'react'
import { Button } from '../ui/button'
import { LogOut } from 'lucide-react'
import { useRoom } from '@huddle01/react'
import { useRouter } from 'next/router'

interface MediaTrayProps {
  audioEnabled: boolean
  setAudioEnabled: (enabled: boolean) => void
}

const MediaTray: React.FC<MediaTrayProps> = ({ audioEnabled, setAudioEnabled }) => {
  const {closeRoom} = useRoom()

  const router = useRouter();

  const handleCloseRoom = () => {
    closeRoom()

    router.push('/')
  }

  return (
    <div className = 'grid grid-cols-[2fr_10fr_2fr] items-center px-8' >
    <p />
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
            onClick={handleCloseRoom}
            variant="destructive" 
            className="rounded-full w-12 h-12 bg-[#e15b5b] hover:bg-[#d14a4a] border-0 text-white font-medium transition-all duration-200"
          >
            <LogOut />
          </Button>
        </div>
      </div>
      </div>
  )
}

export default MediaTray