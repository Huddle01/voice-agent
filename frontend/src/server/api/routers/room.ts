import { z } from "zod";

import { createTRPCRouter, publicProcedure } from "@/server/api/trpc";
import {AccessToken, Role} from '@huddle01/server-sdk/auth'
import {API} from '@huddle01/server-sdk/api'

import { TRPCError } from "@trpc/server";
import { env } from "@/env";

export const roomRouter = createTRPCRouter({
    create: publicProcedure.mutation(async ({ input }) => {
        try{   
            const api = new API({
                apiKey: env.HUDL_API_KEY,
            });

            const response = await api.createRoom({
                roomLocked: false,
            })

            return {
                message: response.message,
                roomId: "DAAO"
            }

        }catch(error){
            console.error(error)

            if (error instanceof TRPCError) {
                throw error
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to generate token',
            })
        }


    }),
  token: publicProcedure
    .input(z.object({ roomId: z.string(), displayName: z.string() }))
    .mutation(async ({ input }) => {
        try{   
            const {
                displayName,
                roomId,
            } = input;

            const at = new AccessToken({
                roomId,
                apiKey: env.HUDL_API_KEY,
                role: Role.HOST,
                options: {
                    metadata: {
                        "displayName": displayName,
                    }
                }
            })

            const token = await at.toJwt()

            return {
                token,
            }

        }catch(error){
            console.error(error)

            if (error instanceof TRPCError) {
                throw error
            }

            throw new TRPCError({
                code: 'INTERNAL_SERVER_ERROR',
                message: 'Failed to generate token',
            })
        }
    }),
});
