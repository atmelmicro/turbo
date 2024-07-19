import type { ComponentPropsWithoutRef, ReactNode } from "react";
import NextLink from "next/link";
import { Flex, Grid, Link as RadixLink, Text } from "@radix-ui/themes";
import { twMerge } from "tailwind-merge";

export function Link({
  children,
  className,
  href,
  ...props
}: ComponentPropsWithoutRef<typeof RadixLink>) {
  return (
    <RadixLink asChild {...props}>
      <NextLink
        className={twMerge(className, "flex flex-row items-center gap-1")}
        href={href ?? ""}
      >
        {children}
      </NextLink>
    </RadixLink>
  );
}

export function LinkCard({
  title,
  icon,
  desc,
  href,
  className,
  aClassName,
}: {
  title: string;
  icon?: ReactNode;
  desc?: string;
  href: string;
  className?: string;
  aClassName?: string;
}) {
  return (
    <NextLink className={twMerge("group", aClassName)} href={href}>
      <div
        className={twMerge(
          "flex items-center gap-2 rounded-md border border-stone-300 p-3 px-6 py-4 transition-all group-hover:border-blue-500",
          className,
        )}
      >
        <Grid gap="1">
          <Flex align="center" gap="2">
            {icon}
            <Text size="4">{title}</Text>
          </Flex>
          {desc ? <Text>{desc}</Text> : null}
        </Grid>
      </div>
    </NextLink>
  );
}
