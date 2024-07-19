import { readdir } from "fs/promises";
import { join } from "path";
import { SupportNavClient } from "./supportnav.client";

export interface Tree {
  [x: string]: Tree;
}

export async function getTree(path: string) {
  const dir = (await readdir(path, { withFileTypes: true })).filter(
    (x) => x.isDirectory(), // ignore files
  );
  if (dir.length === 0) return {}; // its an end dir

  const tree: Tree = {};
  for (const x of dir) {
    // eslint-disable-next-line no-await-in-loop -- this would be really complex to promise all and it just runs at build time
    tree[x.name] = await getTree(join(x.path, x.name));
  }
  return tree;
}

export async function SupportNav({ base, url }: { base: string; url: string }) {
  const tree = await getTree(base);
  return <SupportNavClient tree={tree} url={url} />;
}
