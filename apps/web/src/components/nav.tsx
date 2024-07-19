"use client";

import {
  CaretDownIcon,
  GroupIcon,
  PersonIcon,
  QuestionMarkIcon,
  WidthIcon,
} from "@radix-ui/react-icons";
import * as NavigationMenu from "@radix-ui/react-navigation-menu";
import { Flex } from "@radix-ui/themes";
import Link from "next/link";
import type { ComponentPropsWithoutRef, ElementRef, ReactNode } from "react";
import { forwardRef, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import Image from "next/image";
import MatLogo from "../../public/mat.svg";
import { HorizontalLine } from "./line";

export function Navbar({ children }: { children?: ReactNode }) {
  const [value, setValue] = useState("");
  const lastOpen = useRef<undefined | number>(undefined);

  function handleOpen(newValue: string) {
    const now = new Date().getTime();
    if (
      value !== "" ||
      lastOpen.current === undefined ||
      now - lastOpen.current > 200
    ) {
      lastOpen.current = now;
      setValue(newValue);
    }
  }

  return (
    <div className="fixed top-0 z-50 w-full border-b border-b-gray-200 bg-white/80 backdrop-blur-lg">
      <Flex className="mx-auto max-w-7xl" gap="2" height="7" justify="between">
        <Link href="/">
          <Image
            alt="mat development"
            className="flex h-10 w-fit justify-center p-2"
            height={39}
            src={MatLogo}
          />
        </Link>

        <div className="flex items-center pr-4">
          <Link href="/products/mat-blinds" className="font-medium">
            MAT Blinds
          </Link>
        </div>
        {/*
        <NavigationMenu.Root
          className="relative z-[1] flex w-full justify-end"
          onValueChange={handleOpen}
          value={value}
        >
          <NavigationMenu.List className="center m-0 flex list-none rounded-md p-1">
            <NavigationMenu.Item>
              <NavigationMenuTrigger>
                Products <NavigationMenuArrow />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <div className="flex flex-col gap-2 p-3 sm:h-52 sm:flex-row">
                  <Link
                    className="flex h-32 w-full flex-col justify-end gap-1 rounded-md border border-slate-300 bg-gradient-to-tr from-slate-50 to-slate-200 p-3 transition-all hover:brightness-95 sm:aspect-square sm:h-full sm:w-auto"
                    href="/products/mat-blinds"
                  >
                    <h1 className="text-lg font-medium">MAT Blinds</h1>
                    <p>Blinds of tommorow</p>
                  </Link>
                  <div className="flex h-full w-full flex-col gap-2 sm:w-64">
                    <NavLink
                      desc="Connectivity, without the hastle"
                      href="/products/mat-hub"
                      icon={<WidthIcon />}
                      title="MAT Hub"
                    />
                    <div className="px-4">
                      <HorizontalLine className="hidden sm:block" />
                    </div>
                    <NavLink
                      desc="Checkout all the MAT products"
                      href="/products"
                      icon={<GroupIcon />}
                      title="All products"
                    />{" "}
                  </div>
                </div>
              </NavigationMenuContent>
            </NavigationMenu.Item>

            <NavigationMenuLink href="/support">
              <span className="hidden sm:block">Support</span>
              <QuestionMarkIcon className="block sm:hidden" />
            </NavigationMenuLink>

            <NavigationMenu.Item>
              <NavigationMenuTrigger>
                <span className="hidden sm:block">Account</span>
                <PersonIcon className="block sm:hidden" />
                <NavigationMenuArrow />
              </NavigationMenuTrigger>
              <NavigationMenuContent>
                <ul className="grid list-none gap-3 p-6 sm:w-[300px]">
                  {children}
                </ul>
              </NavigationMenuContent>
            </NavigationMenu.Item>

            <NavigationMenu.Indicator className="top-full z-[1] flex h-[10px] items-end justify-center overflow-hidden transition-[width,transform_250ms_ease] data-[state=hidden]:animate-fadeOut data-[state=visible]:animate-fadeIn">
              <div className="relative top-[70%] h-[10px] w-[10px] rotate-[45deg] rounded-tl-[2px] bg-white" />
            </NavigationMenu.Indicator>
          </NavigationMenu.List>

          <div className="absolute right-2 top-full z-50 flex w-full justify-end perspective-[2000px]">
            <NavigationMenu.Viewport className="relative z-50 mt-[10px] h-[var(--radix-navigation-menu-viewport-height)] w-full origin-[top_center] overflow-hidden rounded-md border border-gray-200 bg-white shadow-md transition-[width,_height] duration-300 data-[state=closed]:animate-scaleOut data-[state=open]:animate-scaleIn sm:w-[var(--radix-navigation-menu-viewport-width)]" />
          </div>
        </NavigationMenu.Root>

         */}
      </Flex>
    </div>
  );
}

function NavLink({
  desc,
  href,
  icon,
  title,
}: {
  icon: ReactNode;
  title: string;
  desc: string;
  href: string;
}) {
  return (
    <NavigationMenu.Link asChild>
      <Link
        className="h-full w-full rounded-md border border-dashed border-transparent px-3 py-1 transition-all hover:border-stone-300"
        href={href}
      >
        <div className="flex items-center gap-2">
          {icon}
          <h1 className="text-lg font-medium">{title}</h1>
        </div>
        <p className="text-stone-600">{desc}</p>
      </Link>
    </NavigationMenu.Link>
  );
}

const NavigationMenuLink = forwardRef<
  ElementRef<typeof NavigationMenu.Link>,
  ComponentPropsWithoutRef<typeof NavigationMenu.Link>
>(({ className, children, href, ...props }, ref) => (
  <li>
    <NavigationMenu.Link
      className={twMerge(
        "block select-none px-3 py-2 text-[15px] font-medium leading-none text-stone-800 no-underline outline-none ring-blue-500 hover:text-stone-950 focus:shadow-[0_0_0_2px] focus:ring-2",
        className,
      )}
      ref={ref}
      {...props}
      asChild
    >
      <Link href={href ?? ""}>{children}</Link>
    </NavigationMenu.Link>
  </li>
));
NavigationMenuLink.displayName = NavigationMenu.Link.displayName;

const NavigationMenuTrigger = forwardRef<
  ElementRef<typeof NavigationMenu.Trigger>,
  ComponentPropsWithoutRef<typeof NavigationMenu.Trigger>
>(({ className, children, ...props }, ref) => (
  <NavigationMenu.Trigger
    className={twMerge(
      "group flex select-none items-center justify-between gap-[2px] px-3 py-2 text-[15px] font-medium leading-none text-stone-800 outline-none ring-blue-500 hover:text-stone-950 focus:ring-2",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </NavigationMenu.Trigger>
));
NavigationMenuTrigger.displayName = NavigationMenu.Trigger.displayName;

const NavigationMenuContent = forwardRef<
  ElementRef<typeof NavigationMenu.Content>,
  ComponentPropsWithoutRef<typeof NavigationMenu.Content>
>(({ className, children, ...props }, ref) => (
  <NavigationMenu.Content
    className={twMerge(
      "absolute left-0 top-0 w-full data-[motion=from-end]:animate-enterFromRight data-[motion=from-start]:animate-enterFromLeft data-[motion=to-end]:animate-exitToRight data-[motion=to-start]:animate-exitToLeft sm:w-auto",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </NavigationMenu.Content>
));
NavigationMenuContent.displayName = NavigationMenu.Trigger.displayName;

const NavigationMenuArrow = forwardRef<
  ElementRef<typeof CaretDownIcon>,
  ComponentPropsWithoutRef<typeof CaretDownIcon>
>(({ className, children, ...props }, ref) => (
  <CaretDownIcon
    className={twMerge(
      "text-violet10 relative top-[1px] transition-transform duration-[250] ease-in group-data-[state=open]:-rotate-180",
      className,
    )}
    ref={ref}
    {...props}
  >
    {children}
  </CaretDownIcon>
));
NavigationMenuArrow.displayName = CaretDownIcon.displayName;

export const ListItem = forwardRef<
  ElementRef<typeof Link>,
  ComponentPropsWithoutRef<typeof Link>
>(({ className, children, title, ...props }, forwardedRef) => (
  <li>
    <NavigationMenu.Link asChild>
      <Link
        className={twMerge(
          "block select-none rounded-md p-3 text-[15px] leading-none no-underline outline-none transition-colors hover:bg-stone-200 focus:shadow-[0_0_0_2px] focus:shadow-stone-500",
          className,
        )}
        {...props}
        ref={forwardedRef}
      >
        {title ? (
          <div className="mb-1 font-medium leading-[1.2]">{title}</div>
        ) : null}
        <p className="leading-[1.4]">{children}</p>
      </Link>
    </NavigationMenu.Link>
  </li>
));

ListItem.displayName = "navigation-link-styled";
