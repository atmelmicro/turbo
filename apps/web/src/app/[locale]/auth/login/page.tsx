"use client";

import { Text, Flex } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { Field, FormButton } from "@/components/form";
import { Link } from "@/components/link";
import { login } from "@/backend/auth";
import { StatusBadge } from "@/components/badge";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const [state, formAction] = useFormState(login, { next: searchParams.next });

  return (
    <>
      <Flex align="center" justify="between">
        <Text className="w-20" size="4" weight="medium">
          Log in
        </Text>
        <StatusBadge status={state} />
      </Flex>
      <form action={formAction} className="grid gap-2">
        <Field id="email" label="Email" type="email" />
        <Field id="password" label="Password" type="password" />
        <FormButton>Log in</FormButton>
      </form>
      <Flex justify="between">
        <Link className="text-sm" href="/auth/register">
          Register
        </Link>
        <Link className="text-sm" href="/auth/reset">
          Forgot your password?
        </Link>
      </Flex>
    </>
  );
}
