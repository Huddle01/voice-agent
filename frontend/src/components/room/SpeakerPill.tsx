import React, { useEffect } from 'react'

const SpeakerPill = () => {
  return (
    <div className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 flex items-center justify-center gap-1 w-32">
    {[...Array(4)].map((_, i) => {
      const randomHeight = 8 + Math.random() * 16;
      return (
        <div 
          className="bg-white rounded-full w-2 animate-pulse opacity-80"
          style={{ 
            height: `${randomHeight}px`,
            animationDelay: `${i * 20}ms`
          }}
        />
      );
    })}
  </div>
  )
}

export default React.memo(SpeakerPill)