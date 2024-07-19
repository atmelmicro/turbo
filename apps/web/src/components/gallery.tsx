"use client";

import { ChevronLeftIcon, ChevronRightIcon } from "@radix-ui/react-icons";
import { IconButton } from "@radix-ui/themes";
import type { StaticImageData } from "next/image";
import { useState, type ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";

interface GalleryProps {
  children?: ReactNode;
  className?: string;
  photos: {
    image: StaticImageData;
    alt: string;
  }[];
}

export function Gallery(props: GalleryProps) {
  const [index, setIndex] = useState(0);

  function next() {
    setIndex(index + 1 >= props.photos.length ? 0 : index + 1);
  }

  function prev() {
    setIndex(index - 1 < 0 ? 0 : index - 1);
  }

  return (
    <div
      className={twMerge(
        "relative h-full  w-full rounded-md border border-stone-500 shadow-md",
        props.className,
      )}
    >
      <Image
        alt={props.photos[index].alt}
        className="object-cover"
        fill
        src={props.photos[index].image}
      />
      <div className="absolute bottom-0 left-0 flex h-12 w-full flex-row items-center justify-center gap-5">
        <IconButton color="gray" onClick={prev} radius="small" variant="solid">
          <ChevronLeftIcon />
        </IconButton>
        <div className="flex h-8 items-center rounded-sm bg-stone-500/50 px-3 text-sm backdrop-blur-md">
          {props.photos[index].alt}
        </div>
        <IconButton color="gray" onClick={next} radius="small" variant="solid">
          <ChevronRightIcon />
        </IconButton>
      </div>
    </div>
  );
}
