import { cn } from '@/lib/utils';
import { agentPeerIdAtom } from '@/store/room.store';
import { useActivePeers } from '@huddle01/react';
import { useAtomValue } from 'jotai';
import type React from 'react'
import RandomDots from './RandomDots';

const AgentCard: React.FC = () => {
    const agentPeerId = useAtomValue(agentPeerIdAtom);
    const {dominantSpeakerId} = useActivePeers();

    let aiSpeaking = false;

    if (dominantSpeakerId == agentPeerId) {
        aiSpeaking = true;
    }

  return (
    <div className={cn("relative flex-grow m-4 overflow-hidden bg-black rounded-xl shadow-xl")}>
    <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <div className="flex flex-col items-center justify-center">
        <div className={cn(
            "relative w-40 h-40 mb-4 transition-all duration-500",
            aiSpeaking ? "scale-125" : "scale-100",
        )}>
            <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-900/20 via-indigo-900/10 to-blue-900/20" />
            
            <div className="absolute inset-0 overflow-hidden rounded-full">
            <div className={cn(
                "absolute inset-0 bg-gradient-to-b from-blue-500 to-cyan-500",
                aiSpeaking ? "opacity-80" : "opacity-60",
                "transition-opacity duration-500"
            )} />
            
            <div className={cn(
                "absolute inset-0 overflow-hidden rounded-full",
                aiSpeaking ? "opacity-80" : "opacity-40",
                "transition-opacity duration-500"
            )}>
                <div className={cn(
                "absolute w-64 h-64 rounded-full bg-gradient-to-r from-blue-300/40 to-blue-500/40 -top-32 left-1/2 -translate-x-1/2",
                "animate-slow-pulse"
                )} style={{ animationDuration: '8s' }} />
                
                <div className={cn(
                "absolute w-64 h-64 rounded-full bg-gradient-to-r from-cyan-300/40 to-cyan-500/40 -bottom-32 left-1/2 -translate-x-1/2",
                "animate-slow-pulse-reverse"
                )} style={{ animationDuration: '10s', animationDelay: '1s' }} />
            </div>
            
            <div className="absolute inset-0 bg-blue-900/20 rounded-full" />
            
            {[...Array(5)].map((_, i) => (
                <div 
                className={cn(
                    "absolute w-full h-px bg-gradient-to-r from-amber-500/0 via-amber-400/60 to-amber-500/0",
                    "transition-all duration-300",
                    aiSpeaking ? "opacity-80" : "opacity-30"
                )}
                style={{ 
                    top: `${20 + i * 15}%`,
                    transform: `translateY(${aiSpeaking ? (Math.sin(i) * 5) : 0}px)`,
                    transition: 'transform 1s ease-in-out, opacity 0.5s ease'
                }}
                />
            ))}
            
            {aiSpeaking && (
                <RandomDots />
            )}
            </div>
        </div>
        </div>
    </div>
    </div>
  )
}

export default AgentCard


