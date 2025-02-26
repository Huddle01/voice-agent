"use client";

import { GeistSans } from "geist/font/sans";
import type { AppType } from "next/app";
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { api } from "@/utils/api";
import {HuddleClient, HuddleProvider} from '@huddle01/react';


import "@/styles/globals.css";
import { env } from "@/env";

const huddleClient = new HuddleClient({
  projectId: env.NEXT_PUBLIC_HUDL_PROJECT_ID,
  options: {
    activeSpeakers:{
      size: 10,
    },
    autoConsume: true,
    logging: true,
    volatileMessaging: true,
  }
});

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <HuddleProvider key='huddle-provider' client={huddleClient} >
      <div className={cn(GeistSans.className, "bg-black min-h-screen text-white")}>
        <Component {...pageProps} />
        <Toaster />
      </div>
    </HuddleProvider>
  );
};

export default api.withTRPC(MyApp);


