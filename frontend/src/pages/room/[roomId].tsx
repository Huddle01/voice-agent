import React, { useState } from 'react';
import MediaTray from '@/components/room/MediaTray';
import AgentCard from '@/components/room/Peers/AgentCard';
import {Share} from 'lucide-react';
import AudioController from '@/components/room/AudioController';

const RoomPage = () => {
  const [audioEnabled, setAudioEnabled] = useState(true);

  return (
    <section className="flex flex-col h-screen text-white bg-black">
      <div className="flex items-center justify-center mt-5 z-10 px-5">
        <div className='flex-1 grid place-content-center' >
          <div className="bg-[#1a1a1a] w-fit px-5 flex-1 py-2.5 rounded-full flex items-center shadow-md">
            <h1 className="text-sm font-medium text-gray-200">Voice Agent at Work.</h1>
          </div>
        </div>
        
      
        <div className='cursor-pointer' >
          <Share className='text-zinc-400 hover:text-zinc-300 transition-all duration-150' size={20} />
        </div>

      </div>
      
      <AgentCard />

      <div>
      <MediaTray
        audioEnabled={audioEnabled}
        setAudioEnabled={setAudioEnabled}
      />
      </div>

      <AudioController />
    </section>
  );
};

export default RoomPage