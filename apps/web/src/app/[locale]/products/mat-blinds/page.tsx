import {
  ArrowDownIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  CheckIcon,
  FrameIcon,
  LightningBoltIcon,
} from "@radix-ui/react-icons";
import { Button, Grid, Heading, Text, TextField } from "@radix-ui/themes";
import Image from "next/image";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { Gallery } from "@/components/gallery";
import MatBlind from "@/../public/mat-blind.webp";
import BlindBatt from "@/../public/blind-batt.webp";
import HassLogo from "@/../public/hass.svg";
import { Link } from "@/components/link";
import {
  AnimatedText,
  ChangingText,
  EmailForm,
  ScrollAnimation,
} from "./client";
import styles from "./page.module.css";
import { getI18n } from "@/locales/server";

export default async function BlindsPage() {
  const t = await getI18n();

  return (
    <div className="grid gap-10 bg-stone-900 p-10 pt-20 text-white">
      <Section className="flex flex-col justify-between">
        <Grid className="h-fit" gap="3" rows="2">
          <Text size="8" weight="medium">
            MAT Blinds
          </Text>
          <Text>{t("blinds_subtext")}</Text>
        </Grid>
        <Image
          alt="femboy image"
          className="mb-10 ml-10 h-fit self-end"
          height={400}
          src={MatBlind}
        />
      </Section>
      <Section className="grid h-fit max-h-none grid-cols-1 gap-5 sm:grid-cols-2 md:grid-cols-3">
        <Card className="h-full w-full md:row-span-2">
          {t("rolling")}
          <ArrowUpIcon
            className="absolute bottom-[-40px] left-[-50px] text-white opacity-30"
            height={200}
            width={200}
          />
          <ArrowDownIcon
            className="absolute bottom-[-10px] right-[-10px] text-white opacity-30"
            height={100}
            width={100}
          />
        </Card>
        <Card>
          {t("compat")}
          <Image
            src={HassLogo}
            alt="Home Assistant"
            className="absolute bottom-5 left-5 opacity-30"
            height={100}
            width={100}
          />
        </Card>
        <Card>
          {t("sleek_design")}
          <FrameIcon
            className="absolute bottom-[-40px] left-1/2 -translate-x-1/2 text-white opacity-30"
            height={200}
            width={200}
          />
        </Card>
        <Card className="md:col-span-2">
          {t("batt_life")}
          <LightningBoltIcon
            className="absolute bottom-[-40px] right-[-50px] text-white opacity-30"
            height={200}
            width={200}
          />
        </Card>
      </Section>
      <Section>
        <Heading align="center" className="!font-mono">
          {t("design_home")}
        </Heading>
        <div className="flex h-full w-full items-center justify-center">
          <div className="flex h-full w-full py-10">
            {/* grid h-4/5 w-full grid-cols-1 gap-5 md:h-[80vw] md:max-h-[min(100%,_40rem)] md:grid-cols-3 md:py-20 */}
            <Image
              src={BlindBatt}
              alt="A mat battery being inserted into mat blinds"
              className="object-contain"
            />
            {/*
            <Gallery
              className="mx-4 w-screen max-w-[20rem] justify-self-center md:w-auto md:justify-self-stretch"
              photos={[{ alt: "Femboy", image: Femboy }]}
            />
            <Gallery
              className="col-span-2 hidden md:block"
              photos={[{ alt: "Femboy2", image: Femboy }]}
            />
  */}
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex max-w-2xl flex-col gap-2">
          <Heading className="!font-mono" size="7">
            {t("always_connected")}
          </Heading>
          <Text>{t("always_connected_sub")}</Text>
        </div>
        <div className="flex h-full items-center justify-center">
          <div className="mx-auto grid h-1/2 w-full max-w-md grid-cols-1 grid-rows-3 items-center justify-items-center gap-10 sm:h-full sm:grid-cols-3 sm:grid-rows-1">
            <p className="rounded-md border border-stone-600 bg-stone-700 px-4 py-2">
              MAT Blinds
            </p>
            <CheckIcon height={32} width={32} />
            <ChangingText
              text={[
                { className: "text-blue-500", text: "Alexa" },
                { className: "text-yellow-500", text: "Apple Home" },
                { className: "text-sky-500", text: "MAT Home" },
                { className: "text-green-500", text: "Google Home" },
                { className: "text-cyan-500", text: "Home Assitant" },
              ]}
            />
          </div>
        </div>
      </Section>
      <Section>
        <div className="flex h-full w-full flex-col gap-2">
          <div className="max-w-2xl">
            <Heading className="!font-mono" size="7">
              {t("forget")}
            </Heading>
            <Text>{t("forget_sub")}</Text>
          </div>
          <div className="relative h-full w-full">
            <ScrollAnimation
              className="absolute left-10 top-44 h-64 w-64"
              motionClassName="bg-[radial-gradient(#e66464AA,_#00000000_70%)]"
              offset={[1, 0.7]}
            />
            <ScrollAnimation
              className="absolute right-2 top-2 h-64 w-64"
              motionClassName="bg-[radial-gradient(#d97706AA,_#00000000_70%)]"
              offset={[1, 1.2]}
            />
            <AnimatedText />
          </div>
        </div>
      </Section>
      {/* 
      <Section className="h-[50vh] max-h-[32rem] min-h-[16rem]">
        <Heading className="!font-mono" size="7">
          Buy MAT Blinds
        </Heading>
        <Link className="w-fit !text-stone-200" href="/store" size="4">
          Go to the store <ArrowRightIcon />
        </Link>
      </Section>
      */}
      <Section>
        <Heading className="!font-mono" size="7">
          {t("email_prompt")}
        </Heading>
        <EmailForm />
      </Section>
    </div>
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
    <>
      <section
        className={twMerge(
          "mx-auto flex h-[80vh] max-h-[48rem] min-h-[32rem] w-full max-w-5xl flex-col",
          className,
        )}
      >
        {children}
      </section>
      <Line />
    </>
  );
}

function Line() {
  return <div className={`mx-auto h-px w-full max-w-[350px] ${styles.line}`} />;
}

function Card({
  children,
  className,
}: {
  children?: ReactNode;
  className?: string;
}) {
  return (
    <div
      className={twMerge(
        "relative min-h-[12rem] overflow-hidden rounded-md border border-stone-600 bg-gradient-to-t from-stone-800 to-stone-900 p-4 text-white transition-all hover:brightness-125 sm:min-h-fit",
        className,
      )}
    >
      {children}
    </div>
  );
}
