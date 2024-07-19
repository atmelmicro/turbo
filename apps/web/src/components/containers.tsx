import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";

export function Section({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge("mx-auto grid max-w-6xl gap-10 px-4 pt-16", className)}
    >
      {children}
    </div>
  );
}
