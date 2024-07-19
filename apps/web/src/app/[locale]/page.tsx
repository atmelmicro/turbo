import { Box, Button, Heading, Text } from "@radix-ui/themes";
import { ArrowRightIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import Image from "next/image";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Line } from "@/components/line";
import NestHub from "@/../public/nest-hub.webp";
import MatBlinds from "@/../public/mat-blind.webp";
import Window from "@/../public/window.webp";
import { Section as MainSection } from "@/components/containers";
import { getCurrentLocale, getI18n } from "@/locales/server";
import { Pattern } from "./client";

export default async function Page() {
  const t = await getI18n();

  return (
    <MainSection>
      <Section className="flex min-h-[60vh] flex-col justify-between">
        <div className="flex flex-col gap-3">
          <h1 className="font-mono text-4xl font-bold leading-relaxed">
            {t("line1")}
            <br />
            {t("line2")}
          </h1>
          {/**
          <Link href="/products/mat-blinds">
            <div className="flex w-fit items-center gap-4 rounded-full border border-stone-300 bg-stone-100 px-4 py-1 text-blue-900">
              {t("news")} <ArrowRightIcon height={20} width={20} />
            </div>
          </Link> */}
        </div>
        <div className="flex w-full flex-col items-start justify-between gap-10 lg:flex-row lg:items-end lg:gap-2">
          <Button aria-label={t("explore")} asChild size="3" variant="surface">
            <Link href="/products/mat-blinds">
              {t("cta")} <ArrowRightIcon />
            </Link>
          </Button>
          <Box position="relative">
            {/*<Pattern className="absolute left-0 top-0 hidden -translate-x-1/2 -translate-y-1/2 sm:block" /> */}
            <Image
              alt="femboy"
              className="relative top-0 rounded-sm border-stone-300"
              loading="eager"
              src={NestHub}
              width={600}
            />
          </Box>
        </div>
      </Section>
      <Line>{t("connectivity")}</Line>
      <Section className="flex h-full max-h-[38rem] min-h-[16rem] flex-col gap-0">
        <Heading className="!font-mono">{t("madeforeveryone")}</Heading>
        <Image
          src={Window}
          alt="mat blinds mounted on a window"
          className="mx-auto h-full w-auto object-contain pt-10"
        />
      </Section>
      <Line>{t("current_products")}</Line>
      <div className="mx-auto flex w-full max-w-4xl flex-col gap-5 sm:flex-row">
        <Product
          desc={t("blinds_subtext")}
          heading="MAT Blinds"
          href="/products/mat-blinds"
        />
        {/* <Product
          desc="Connectivity for all"
          heading="MAT Hub"
          href="/products/mat-hub"
        /> */}
      </div>
    </MainSection>
  );
}

function Product({
  desc,
  heading,
  href,
}: {
  heading: string;
  href: string;
  desc: string;
}) {
  return (
    <Link className="mx-auto flex w-1/2 flex-col gap-2" href={href}>
      <Image
        src={MatBlinds}
        className="aspect-square h-auto w-full object-contain"
        alt="Mat Blinds"
      />
      <div>
        <Heading size="4" weight="medium">
          {heading}
        </Heading>
        <Text color="gray">{desc}</Text>
      </div>
    </Link>
  );
}

function Section({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "flex flex-col items-start gap-24 border border-stone-200 px-8 py-10",
        className,
      )}
    >
      {children}
    </div>
  );
}
