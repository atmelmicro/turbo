"use client";

import { random } from "@/util/random";
import { animate, motion, useMotionValue, useTransform } from "framer-motion";
import { useEffect, useState } from "react";
import { twMerge } from "tailwind-merge";

export function MovingText() {
  const textIndex = useMotionValue(0);
  const [styleIndex, setStyleIndex] = useState(0);

  const styles = [
    "from-blue-500 to-emerald-500",
    "from-red-500 to-blue-500",
    "from-purple-500 to-cyan-500",
    "from-yellow-500 to-red-500",
    "from-pink-500 to-fuchsia-500",
  ];

  const texts = [
    `smart`,
    `realible`,
    `fast`,
    `local`,
    `affordable`,
    `actually quick to set up`,
    `"not a ugly brick"`,
  ];

  const baseText = useTransform(textIndex, (latest) => texts[latest] || "");
  const count = useMotionValue(0);
  const rounded = useTransform(count, (latest) => Math.round(latest));
  const displayText = useTransform(rounded, (latest) =>
    baseText.get().slice(0, latest),
  );
  const updatedThisRound = useMotionValue(true);

  useEffect(() => {
    void animate(count, 60, {
      type: "tween",
      duration: 1,
      ease: "easeIn",
      repeat: Infinity,
      repeatType: "reverse",
      repeatDelay: 1,
      onUpdate(latest) {
        if (updatedThisRound.get() && latest > 0) {
          updatedThisRound.set(false);
        } else if (!updatedThisRound.get() && latest === 0) {
          if (textIndex.get() === texts.length - 1) {
            textIndex.set(0);
          } else {
            textIndex.set(textIndex.get() + 1);
          }
          setStyleIndex(random(0, styles.length - 1));
          updatedThisRound.set(true);
        }
      },
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps -- :)
  }, []);

  return (
    <motion.span
      className={twMerge(
        "inline-block bg-gradient-to-r bg-clip-text font-medium text-transparent",
        styles[styleIndex],
      )}
    >
      {displayText}
    </motion.span>
  );
}
