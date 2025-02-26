import {atom} from 'jotai';

export const roomIdAtom = atom<string | null>(null);

export const setRoomIdAtom = atom(null, (get, set, roomId: string) => {
    set(roomIdAtom, roomId);
});

export const agentPeerIdAtom = atom<string | null>(null);

export const setAgentPeerIdAtom = atom(null, (get, set, agentPeerId: string) => {
    set(agentPeerIdAtom, agentPeerId);
});

