import { ArrowDownIcon } from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import styles from "./line.module.css";

export function Line({ children }: { children: ReactNode }) {
  return (
    <div className={`relative mx-auto h-32 w-px ${styles.line}`}>
      <div className="absolute left-0 top-1/2 flex w-max -translate-x-1/2 -translate-y-1/2 flex-row items-center gap-2 bg-white p-1 text-stone-700">
        {children} <ArrowDownIcon />
      </div>
    </div>
  );
}

export function VerticalLine({ className }: { className?: string }) {
  return (
    <div className={twMerge(`${styles.vertical} h-full w-px`, className)} />
  );
}

export function HorizontalLine({ className }: { className?: string }) {
  return (
    <div className={twMerge(`${styles.horizontal} h-px w-full`, className)} />
  );
}
