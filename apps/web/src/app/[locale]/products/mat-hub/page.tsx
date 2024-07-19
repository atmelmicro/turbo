import { Button, Heading, Text } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { twMerge } from "tailwind-merge";
import { ArrowTopRightIcon } from "@radix-ui/react-icons";
import { Section } from "@/components/containers";
import { Link } from "@/components/link";
import { MovingText } from "./client";
import styles from "./styles.module.css";

export default function MatHubPage() {
  return (
    <Section>
      <div className="flex h-[85vh] flex-col gap-3">
        <Heading align="center" size="8" weight="medium">
          MAT Hub
        </Heading>
        <h1 className="text-center font-mono text-2xl">
          The <MovingText /> hub
        </h1>
        <div className="h-full w-full bg-red-200" />
        <div className="flex flex-row items-center justify-center gap-2">
          <Button>Go to store</Button>
          <Button variant="surface">Learn more</Button>
        </div>
      </div>
      <main className="mx-auto grid w-full max-w-5xl gap-24 ">
        <Card className="flex flex-col justify-between md:flex-row">
          <div className="p-4 md:p-8">
            <Heading weight="medium">A hub that fits your home</Heading>
            <Text>
              MAT Hub is perfectly designed to fit your home no matter if you
              want it to stand out or blend in.
            </Text>
          </div>
          <div className="aspect-[4/3] h-auto w-full bg-blue-500 p-4 md:h-[28rem] md:w-auto" />
        </Card>

        <Card className="flex h-full max-h-[32rem] flex-col justify-between md:flex-row">
          <div className="flex flex-col gap-2 p-4 md:p-8">
            <Heading weight="medium">Made for MAT</Heading>
            <Text>
              MAT Hub connects effortlessly with MAT Blinds. You can see the
              level of shading with the MAT Home app.
            </Text>
            <Text className="text-stone-500">
              MAT Hub works with some other Zigbee devices. Check out the
              Vefified devices.
            </Text>
          </div>
          <div className="flex h-full items-center justify-center">
            <div className="flex h-full flex-col items-center justify-center p-4 md:aspect-square md:h-full md:max-h-96 md:p-8">
              <div className="z-10 w-fit rounded-sm border border-stone-400 bg-stone-300 px-2 py-1">
                MAT Hub
              </div>
              <div className="flex h-full flex-row gap-10">
                <div className="relative h-full w-[3px] bg-stone-300">
                  <div
                    className={twMerge(
                      "absolute left-0 top-0 h-8 w-full bg-gradient-to-b from-blue-600 to-transparent",
                      styles.line1,
                    )}
                  />
                </div>
                <div className="relative h-full w-[3px] bg-stone-400/80">
                  <div
                    className={twMerge(
                      "absolute left-0 top-0 h-8 w-full bg-gradient-to-t from-red-500 to-transparent",
                      styles.line2,
                    )}
                  />
                </div>
              </div>
              <div className="z-10 w-fit rounded-sm border border-stone-400 bg-stone-300 px-2 py-1">
                MAT Blinds
              </div>
            </div>
          </div>
        </Card>

        <Card className="flex flex-col justify-between md:flex-row">
          <div className="p-4 md:p-8">
            <Heading weight="medium">Automations that you can trust</Heading>
            <Text>
              MAT Hub makes automations easy to setup. Thanks to them being run
              on the hub, they always work
            </Text>
          </div>
          <div className="flex h-64 flex-col p-4 md:aspect-square md:h-96 md:p-8 ">
            <article className="relative flex w-full flex-col rounded-md bg-stone-300 p-4">
              <Text className="text-stone-500">At 9AM</Text>
              <Text>Open Blinds 2</Text>
              <div className="absolute -right-2 -top-2 h-4 w-4 animate-ping rounded-full bg-emerald-500" />
              <div className="absolute -right-2 -top-2 h-4 w-4 rounded-full bg-emerald-500" />
            </article>
          </div>
        </Card>

        <Card className="flex h-96 w-full flex-col justify-between md:flex-row">
          <div className="flex flex-col gap-2 p-4 md:p-8">
            <Heading weight="medium">That&apos;s all</Heading>
            <Link href="/store/mat-hub" target="_blank">
              Go to the store <ArrowTopRightIcon />
            </Link>
          </div>
        </Card>
      </main>
    </Section>
  );
}

function Card({
  children,
  className,
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <div className="flex h-[60vh] items-center justify-center">
      <section
        className={twMerge(
          "rounded-md border-2 border-stone-200 bg-stone-100",
          className,
        )}
      >
        {children}
      </section>
    </div>
  );
}
