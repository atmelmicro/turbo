"use client";

import { Button, Heading, TextArea, Text, Flex } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { Field } from "@/components/form";
import { Section } from "@/components/containers";
import { StatusBadge } from "@/components/badge";
import { sendEmail } from "./actions";

export default function ContactPage() {
  const [state, formAction] = useFormState(sendEmail, {});

  return (
    <Section>
      <div>
        <Heading>Contact us</Heading>
        <Text>
          Something isnt working and you cant fix it yourself? Just contact us
          and well get back to you
        </Text>
      </div>
      <form action={formAction} className="grid max-w-md gap-3">
        <Field id="name" label="Name" />
        <Field id="email" label="Email" type="email" />
        <Field id="desc" label="Description">
          <TextArea id="body" name="body" />
        </Field>
        <Flex align="center" gap="2">
          <Button className="w-fit">Submit</Button>
          <StatusBadge status={state} />
        </Flex>
      </form>
    </Section>
  );
}
