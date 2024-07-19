import {
  HomeIcon,
  InfoCircledIcon,
  LockOpen1Icon,
} from "@radix-ui/react-icons";
import type { ReactNode } from "react";
import { Section } from "@/components/containers";
import { Link } from "@/components/link";

export default function AccountLayout({ children }: { children: ReactNode }) {
  return (
    <Section className="flex flex-col sm:flex-row">
      <ul className="flex h-fit w-full flex-row justify-evenly gap-2 sm:w-32 sm:flex-col">
        <Link href="/account">
          <InfoCircledIcon /> Info
        </Link>
        <Link href="/account/security">
          <LockOpen1Icon /> Security
        </Link>
        <Link href="/account/homes">
          <HomeIcon /> Homes
        </Link>
      </ul>
      {children}
    </Section>
  );
}
