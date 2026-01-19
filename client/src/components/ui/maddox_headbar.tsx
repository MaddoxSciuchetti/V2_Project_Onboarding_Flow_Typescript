import { cn } from "@/lib/utils";
import * as React from "react";

type Header = React.HTMLAttributes<HTMLDivElement>;

function Maddox_Header({ className, ...props }: Header) {
  return <div className={cn("outline bg-gray-300 p4", className)} {...props} />;
}

export { Maddox_Header };
