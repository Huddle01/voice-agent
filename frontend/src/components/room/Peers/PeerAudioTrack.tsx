import React from 'react';

import { useRemoteAudio } from '@huddle01/react/hooks';
import { Audio } from '@huddle01/react/components';
interface Props {
  peerId: string;
}

const PeerAudioTrack: React.FC<Props> = ({ peerId }) => {
  const { state, stream } = useRemoteAudio({
    peerId,
  });


  if (stream && state === 'playable') return <Audio stream={stream} />;

  return null;
};

export default React.memo(PeerAudioTrack);
