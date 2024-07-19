"use client";

import { useI18n } from "@/locales/client";
import { AnimatePresence, motion, useScroll } from "framer-motion";
import type { ReactNode } from "react";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import registerEmail from "./actions";
import { Button, TextField } from "@radix-ui/themes";
import { StatusBadge } from "@/components/badge";
import { useFormState } from "react-dom";
import { PaperPlaneIcon } from "@radix-ui/react-icons";
import { Field } from "@/components/form";

export function ScrollAnimation({
  className,
  motionClassName,
  offset,
}: {
  className?: string;
  motionClassName?: string;
  offset: [number, number];
}) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: [offset, "0 0"],
  });

  return (
    <div className={twMerge("h-full w-full", className)} ref={ref}>
      <motion.div
        className={twMerge("h-full w-full", motionClassName)}
        style={{ opacity: scrollYProgress }}
      />
    </div>
  );
}

export function AnimatedText() {
  const ref = useRef(null);
  const t = useI18n();

  const { scrollYProgress: scroll1 } = useScroll({
    target: ref,
    offset: ["1 1.2", "0 0"],
  });
  const { scrollYProgress: scroll2 } = useScroll({
    target: ref,
    offset: ["1 0.8", "0 0"],
  });
  const { scrollYProgress: scroll3 } = useScroll({
    target: ref,
    offset: ["1 0.6", "0 0"],
  });

  return (
    <div
      className="absolute left-1/2 top-1/2 flex -translate-x-1/2 -translate-y-1/2 flex-col gap-1 rounded-lg text-center text-lg"
      ref={ref}
    >
      <motion.p style={{ opacity: scroll1 }}>{t("forget1")}</motion.p>
      <motion.p style={{ opacity: scroll2 }}>{t("forget2")}</motion.p>
      <motion.p style={{ opacity: scroll3 }}>{t("forget3")}</motion.p>
    </div>
  );
}

export function ChangingText({
  text,
}: {
  text: { text: string; className: string }[];
}) {
  const index = useRef(0);
  const [showing, setShowing] = useState<ReactNode>(
    <FancyText
      className={twMerge(
        "text-center font-mono text-lg font-medium",
        text[index.current].className,
      )}
    >
      {text[index.current].text}
    </FancyText>,
  );

  useEffect(() => {
    const interval = setInterval(() => {
      if (showing === null) {
        setShowing(
          <FancyText
            className={twMerge(
              "text-center font-mono text-lg font-medium",
              text[index.current].className,
            )}
          >
            {text[index.current].text}
          </FancyText>,
        );
      } else {
        setShowing(null);
        if (index.current === text.length - 1) {
          index.current = 0;
        } else {
          index.current++;
        }
      }
    }, 1200);

    return () => {
      clearInterval(interval);
    };
  }, [showing, index, text]);

  return <AnimatePresence>{showing}</AnimatePresence>;
}

export function FancyText({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <motion.p
      animate={{ opacity: 1, y: 0 }}
      className={className}
      exit={{ opacity: 0, y: "-100%" }}
      initial={{ opacity: 0, y: "-100%" }}
    >
      {children}
    </motion.p>
  );
}

export function EmailForm() {
  const [state, formAction] = useFormState(registerEmail, null);

  return (
    <form action={formAction} className="grid max-w-64 gap-3 pt-4">
      {state?.error == true && <p>Email failed to add</p>}
      {state?.error == false && <p>Email added</p>}
      <label className="text-sm" htmlFor="email">
        E-mail
      </label>
      <TextField.Root color="gray" name="email" type="email" id="email" />
      <Button className="w-fit">
        <PaperPlaneIcon />
      </Button>
    </form>
  );
}
