import { usePeerIds } from '@huddle01/react/hooks';
import React from 'react';
import PeerAudioTrack from './Peers/PeerAudioTrack';

const AudioController = () => {
  const { peerIds } = usePeerIds();

  return (
    <>
      {peerIds.map((peerId) => (
        <PeerAudioTrack peerId={peerId} key={`audioPorts-${peerId}`} />
      ))}
    </>
  );
};

export default AudioController;
