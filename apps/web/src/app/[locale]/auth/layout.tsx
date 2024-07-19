import { Card, Grid } from "@radix-ui/themes";
import type { ReactNode } from "react";
import { Section } from "@/components/containers";
import { getAuth } from "@/backend/auth";

export default async function AuthLayout({
  children,
}: {
  children: ReactNode;
}) {
  const auth = await getAuth();
  return (
    <main>
      <Section>
        {auth ? (
          <Card className="mx-auto w-full max-w-md p-4">
            You&apos;re already logged in as{" "}
            <span className="font-mono font-medium">{auth.username}</span>
          </Card>
        ) : null}
        <Card className="mx-auto w-full max-w-md p-4">
          <Grid gap="3">{children}</Grid>
        </Card>
      </Section>
    </main>
  );
}
