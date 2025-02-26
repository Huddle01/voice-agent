import {atom} from 'jotai';


export const agentPeerIdAtom = atom<string | null>(null);

export const setAgentPeerIdAtom = atom(null, (get, set, agentPeerId: string) => {
    set(agentPeerIdAtom, agentPeerId);
});

