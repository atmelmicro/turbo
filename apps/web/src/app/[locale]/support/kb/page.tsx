import { readFile, readdir } from "fs/promises";
import { Heading, Text } from "@radix-ui/themes";
import { LinkCard } from "@/components/link";
import { Section } from "@/components/containers";
import { getStaticParams } from "@/locales/server";
import { resolve } from "path";

export async function generateStaticParams() {
  return getStaticParams();
}
export const dynamicParams = false;
export const runtime = "nodejs";

export default async function KbPage() {
  const dirs = await readdir("./src/kb/", { withFileTypes: true });
  const pages: { title: string }[] = await Promise.all(
    dirs
      .filter((x) => x.isDirectory())
      .map((x) =>
        readFile(resolve(`./src/kb/${x.name}/meta.json`), "utf-8").then(
          JSON.parse,
        ),
      ),
  );

  return (
    <Section>
      <Heading className="!font-mono">Knowledge Base</Heading>
      <Text>Products</Text>
      <div className="flex w-full flex-row flex-wrap gap-4">
        {dirs.map((x, i) => (
          <LinkCard
            aClassName="w-full max-w-sm"
            href={`/support/kb/${x.name}`}
            key={x.name}
            title={pages[i].title}
          />
        ))}
      </div>
    </Section>
  );
}
