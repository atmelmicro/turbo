"use client";

import { useState } from "react";
import { random } from "@/util/random";

export function Pattern({ className }: { className?: string }) {
  const [number, setNumber] = useState(random(1, 510));

  function handleClick() {
    setNumber(random(1, 510));
  }

  return (
    <button
      aria-label="A button that changes a decorative pattern"
      className={className}
      onClick={handleClick}
      type="button"
    >
      <div className="grid h-12 w-12 grid-cols-3 grid-rows-3 content-center justify-center">
        {Array.from({ length: 9 }, (_, index) => {
          return <RandomCircle index={index} key={index} number={number} />;
        })}
      </div>
    </button>
  );
}

function RandomCircle({ number, index }: { number: number; index: number }) {
  // eslint-disable-next-line no-bitwise -- i work in embedded - this rule offends me
  const toShow = (number & (1 << index)) !== 0;
  if (!toShow) return <div />;
  return <div className="h-2 w-2 bg-stone-400" />;
}
