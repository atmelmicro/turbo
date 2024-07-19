"use client";

import { usePathname } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import type { Tree } from "./supportnav";
import { Link } from "./link";

export function SupportNavClient({ tree, url }: { tree: Tree; url: string }) {
  const pathname = usePathname();
  const base = pathname.replace(url, "").slice(1).split("/").slice(1);
  const parts = pathname.split("/");
  const back = parts.slice(0, parts.length - 1).join("/");
  let curr = tree;
  for (const x of base) {
    curr = curr[x];
  }

  return (
    <ul className="items-top flex h-auto w-full flex-col gap-1 overflow-auto border-dashed border-stone-300 pt-0 md:h-96 md:w-64 md:border-r">
      <Link className="flex flex-row items-center gap-1" href={back}>
        <ArrowLeftIcon />
        Go back
      </Link>
      <div className="my-2 w-full border-b border-dashed border-stone-300" />
      {Object.keys(curr).map((x) => (
        <Link href={`${pathname}/${x}`} key={x}>
          {x}
        </Link>
      ))}
    </ul>
  );
}
