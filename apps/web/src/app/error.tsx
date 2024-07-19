"use client";

import { Button, Flex, Heading, Text } from "@radix-ui/themes";
import { useEffect } from "react";
import * as Sentry from "@sentry/nextjs";
import { Section } from "@/components/containers";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    Sentry.captureException(error);
  }, [error]);

  return (
    <Section>
      <Heading>Something went wrong!</Heading>
      <Text>We have been alterted about this error.</Text>
      <Flex gap="2">
        <Button asChild>
          <a href="/">Go home</a>
        </Button>
        <Button
          onClick={() => {
            reset();
          }}
          variant="outline"
        >
          Reload
        </Button>
      </Flex>
    </Section>
  );
}
