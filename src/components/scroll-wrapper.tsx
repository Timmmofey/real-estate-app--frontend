"use client";

import { cn } from "@/lib/utils";
import { OverlayScrollbarsComponent } from "overlayscrollbars-react";
import "overlayscrollbars/overlayscrollbars.css";

export default function ScrollWrapper({ children, className }: { children: React.ReactNode, className:string }) {
  return (
    <OverlayScrollbarsComponent
      options={{
        scrollbars: { autoHide: "scroll" },
      }}
      className={cn("h-full flex flex-col", className)}
    >
      {children}
    </OverlayScrollbarsComponent>
  );
}
