import type { MDXContent } from "mdx/types";
import { setStaticParamsLocale } from "next-international/server";
import type { Metadata } from "next";
import styles from "./page.module.css";
import { SupportNav } from "@/components/supportnav";
import { getStaticParams } from "@/locales/server";
import { readdir } from "node:fs/promises";
import { join } from "node:path";

export const runtime = "nodejs";

interface PageFile {
  default: MDXContent;
  metadata?: { title?: string; desc?: string };
}

async function getPage(
  path: string[],
  locale: string,
): Promise<PageFile | undefined> {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return -- its a import, no types here
  return import(`@/kb/${path.join("/")}/${locale}.mdx`).catch(() => undefined);
}

interface Params {
  params: { path: string[]; locale: string };
}

async function getPageTree(path: string) {
  const dirs = await readdir(path, { recursive: true, withFileTypes: true });
  return dirs
    .filter((x) => x.isDirectory())
    .map((x) => join(x.path, x.name))
    .map((x) => x.slice("src/kb/".length));
}

export async function generateStaticParams() {
  const locales = getStaticParams();
  const tree = await getPageTree("./src/kb");

  return locales
    .map((x) => tree.map((y) => ({ ...x, path: y.split("/") })))
    .flat();
}
export const dynamicParams = false;

export async function generateMetadata({ params }: Params): Promise<Metadata> {
  const page = await getPage(params.path, params.locale);
  if (page === undefined) {
    return {
      title: "MAT Development",
    };
  }

  return {
    title: `MAT Development - ${page.metadata?.title ?? "Support"}`,
    description: page.metadata?.desc,
  };
}

export default async function KbPage({ params }: Params) {
  setStaticParamsLocale(params.locale);
  const page = await getPage(params.path, params.locale);

  if (page === undefined) {
    return <div className="w-full">Select a page with the sidebar</div>;
  }

  return (
    <main className="mx-auto flex w-full max-w-7xl flex-col gap-5 p-4 pt-20 md:flex-row">
      <SupportNav base="./src/kb" url="/support/kb" />
      <div className={styles.mdx}>
        <page.default />
      </div>
    </main>
  );
}
