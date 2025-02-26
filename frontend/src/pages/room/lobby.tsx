import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import { Loader2 } from 'lucide-react'
import { cn } from '@/lib/utils'
import { toast } from "sonner";
import { useRoom } from '@huddle01/react';

const LobbyPage = () => {
  const router = useRouter()
  const { roomId } = router.query
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [statusMessage, setStatusMessage] = useState('Initializing voice agent...')

  const {state} = useRoom({
    onJoin: () => {
      toast.success('Voice assistant is ready', {
        description: 'You can now start your session',
      })
    },
  })

  useEffect(() => {
    const roomId = router.query.roomId as string

    if (!roomId) {
      toast.error('Invalid room ID', {
        description: 'Please try again with a valid room ID',
      })


      // router.push('/')

      return
    }

    const interval = setInterval(() => {
      setLoadingProgress(prev => {
        if (prev >= 100) {
          clearInterval(interval)
          setTimeout(() => {
            router.push(`/room/${roomId}`)
          }, 500)
          return 100
        }
        return prev + 5
      })

      if (loadingProgress < 30) {
        setStatusMessage('Setting up audio environment...')
      } else if (loadingProgress < 60) {
        setStatusMessage('Configuring voice agent parameters...')
      } else if (loadingProgress < 90) {
        setStatusMessage('Almost ready...')
      } else {
        setStatusMessage('Launching your session...')
      }
    }, 300)

    return () => clearInterval(interval)
  }, [loadingProgress, router, roomId])


  if(state === 'connected') {
    router.push(`/room/${roomId}`)

    return null
  }

  return (
    <div className="flex flex-col h-screen justify-center items-center text-white bg-black">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className={cn(
          "absolute w-96 h-96 rounded-full bg-gradient-to-r from-blue-300/20 to-blue-500/20 -top-48 left-1/2 -translate-x-1/2",
          "animate-slow-pulse"
        )}
        style={{ animationDuration: '8s' }}
        />
        <div className={cn(
          "absolute w-96 h-96 rounded-full bg-gradient-to-r from-cyan-300/20 to-cyan-500/20 -bottom-48 left-1/2 -translate-x-1/2",
          "animate-slow-pulse-reverse"
        )}
        style={{ animationDuration: '10s', animationDelay: '1s' }}
        />
      </div>
      
      <div className="z-10 flex flex-col items-center px-4 md:px-8 text-center max-w-lg">
        <h1 className="text-2xl font-semibold mb-2">Preparing Your Voice Assistant</h1>
        <p className="text-zinc-400 mb-8">Please wait while we set up your secure voice environment</p>
        
        <div className="relative mb-4">
          <Loader2 className="w-16 h-16 text-blue-500 animate-spin" />
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-xs font-medium">{loadingProgress}%</span>
          </div>
        </div>
        
        <p className="text-zinc-300 text-sm">
          {statusMessage}
        </p>
        
        <div className="w-full max-w-xs mt-6 bg-gray-800 rounded-full h-2 overflow-hidden">
          <div 
            className="bg-gradient-to-r from-blue-500 to-cyan-500 h-full transition-all duration-300"
            style={{ width: `${loadingProgress}%` }}
          />
        </div>
      </div>
      
      {/* Footer */}
      <div className="absolute bottom-6 text-zinc-500 text-xs">
        Setting up secure voice connection...
      </div>
    </div>
  )
}

export default LobbyPage