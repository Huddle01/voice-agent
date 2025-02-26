import { GeistSans } from "geist/font/sans";
import type { AppType } from "next/app";
import { Toaster } from "@/components/ui/sonner"
import { cn } from "@/lib/utils"
import { api } from "@/utils/api";

import "@/styles/globals.css";

const MyApp: AppType = ({ Component, pageProps }) => {
  return (
    <div className={cn(GeistSans.className, "bg-black min-h-screen text-white")}>
      <Component {...pageProps} />
      <Toaster />
    </div>
  );
};

export default api.withTRPC(MyApp);
