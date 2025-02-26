import { agentPeerIdAtom, roomIdAtom } from "@/store/room.store";
import { api } from "@/utils/api";
import { useActivePeers } from "@huddle01/react";
import { useAtomValue } from "jotai";
import { useRef } from "react";

export const useTurnDetection = () => {
    const {mutateAsync: flushAudio} = api.agent.flushAudio.useMutation();
    const agentPeerId = useAtomValue(agentPeerIdAtom);
    const roomId = useAtomValue(roomIdAtom);

    const prevActiveSpeakerRef = useRef<string | null>(null);
    const {dominantSpeakerId} = useActivePeers();

    if (roomId && prevActiveSpeakerRef.current !== dominantSpeakerId && prevActiveSpeakerRef.current == agentPeerId) {
        flushAudio({
            roomId,
        }).then(() => console.log("Flushed Audio")).catch(console.error);
    }

    if(prevActiveSpeakerRef.current !== dominantSpeakerId){
        prevActiveSpeakerRef.current = dominantSpeakerId;

        return true;
    }
};