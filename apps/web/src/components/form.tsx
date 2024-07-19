"use client";

import { Button, TextField } from "@radix-ui/themes";
import type { ComponentPropsWithoutRef } from "react";
import { useFormStatus } from "react-dom";
import { twMerge } from "tailwind-merge";

export function Field({
  id,
  label,
  className,
  children,
  ...props
}: ComponentPropsWithoutRef<typeof TextField.Root> & { label: string }) {
  return (
    <div className={twMerge("grid w-full gap-0", className)}>
      <label className="text-sm text-stone-600" htmlFor={id}>
        {label}
      </label>
      {children ? (
        children
      ) : (
        <TextField.Root radius="small" name={id} id={id} {...props} />
      )}
    </div>
  );
}

export function FormButton({
  children,
  className,
  ...props
}: ComponentPropsWithoutRef<typeof Button>) {
  const { pending } = useFormStatus();
  return (
    <Button
      className={twMerge("w-fit transition-all", className)}
      loading={pending}
      {...props}
    >
      {children}
    </Button>
  );
}
