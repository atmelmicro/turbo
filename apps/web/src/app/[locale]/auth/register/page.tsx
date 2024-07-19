"use client";

import { Text, Flex, Button } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { Field, FormButton } from "@/components/form";
import { Link } from "@/components/link";
import { register } from "@/backend/auth";
import { StatusBadge } from "@/components/badge";

export default function RegisterPage({
  searchParams,
}: {
  searchParams: { next?: string };
}) {
  const [state, formAction] = useFormState(register, {
    next: searchParams.next,
  });

  return (
    <>
      <Flex align="center" justify="between">
        <Text size="4" weight="medium">
          Register
        </Text>
        <StatusBadge status={state} />
      </Flex>
      <form action={formAction} className="grid gap-2">
        <Field id="username" label="Username" />
        <Field id="email" label="Email" type="email" />
        <Field id="password" label="Password" type="password" />
        <FormButton>Create account</FormButton>
      </form>
      <Link className="text-sm" href="/auth/login">
        Log in
      </Link>
    </>
  );
}
