import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import { TRPCError } from "@trpc/server";
import { z } from "zod";
import axios from 'axios';
import { env } from "@/env";


export const agentRouter = createTRPCRouter({
    callAgent: publicProcedure.input(z.object({
        roomId: z.string(),
        persona: z.string().default("Comedian"),
        initialQuery: z.string().default(''),
        
    })).mutation(async ({input}) => {
        try{
            const {roomId} = input;

            const response = await axios.put<{
                room_id: string,
                agent_peer_id: string,
            }>(`${env.AGENT_URL}/api/v1/flow/join-room`, {
                "room_id": roomId,
                "persona": input.persona,
                "initial_query": input.initialQuery,
            })

            if(response.status !== 200){
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                });
            }

            return response.data;

        }catch(error){
            console.error(error);

            if(error instanceof TRPCError){
                throw error;
            }

            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            });
        }
    }),

    flushAudio: publicProcedure.input(z.object({
        roomId: z.string(),
    })).mutation(async ({input}) => {
        try{
            const {roomId} = input;

            const response = await axios.post(`${env.AGENT_URL}/api/v1/flow/flush-audio`, {
                "room_id": roomId,
            });

            if(response.status !== 200){
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                });
            }

            return response.data;

        }catch(error){
            console.error(error);

            if(error instanceof TRPCError){
                throw error;
            }

            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            });
        }
    }
    ),

    agentInfo: publicProcedure.input(z.object({
        roomId: z.string(),
    })).query(async ({input}) => {
        try{
            const {roomId} = input;

            const response = await axios.get(`${env.AGENT_URL}/api/v1/flow/room-info`, {
                params: {
                    room_id: roomId,
                }
            });

            if(response.status !== 200){
                throw new TRPCError({
                    code: "INTERNAL_SERVER_ERROR",
                    message: "Something went wrong",
                });
            }

            return response.data;

        }catch(error){
            console.error(error);

            if(error instanceof TRPCError){
                throw error;
            }

            throw new TRPCError({
                code: "INTERNAL_SERVER_ERROR",
                message: "Something went wrong",
            });
        }
    }),
});
