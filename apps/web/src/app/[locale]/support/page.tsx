import { Heading } from "@radix-ui/themes";
import { BoxIcon, PersonIcon } from "@radix-ui/react-icons";
import { LinkCard } from "@/components/link";
import { Section } from "@/components/containers";

export default function SupportPage() {
  return (
    <Section>
      <Heading className="!font-mono">How can we help you?</Heading>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <LinkCard
          className="h-full items-start"
          desc="Articles that cover everything about the MAT echosystem"
          href="/support/kb"
          icon={<BoxIcon />}
          title="Knowledge Base"
        />
        <LinkCard
          className="h-full items-start"
          desc="Get in touch with a support rep"
          href="/support/contact"
          icon={<PersonIcon />}
          title="Contact us"
        />
      </div>
    </Section>
  );
}
