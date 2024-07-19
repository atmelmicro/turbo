"use client";

import { Text, Flex } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { Field, FormButton } from "@/components/form";
import { Link } from "@/components/link";
import { reset } from "@/backend/auth";
import { StatusBadge } from "@/components/badge";

export default function LoginPage() {
  const [state, formAction] = useFormState(reset, {});

  return (
    <>
      <Flex align="center" justify="between">
        <Text className="w-48" size="4" weight="medium">
          Reset password
        </Text>
        <StatusBadge status={state} />
      </Flex>
      <form action={formAction} className="grid gap-2">
        <Field id="email" label="Email" type="email" />
        <FormButton>Reset</FormButton>
      </form>
      <Link className="text-sm" href="/auth/login">
        Back to login
      </Link>
    </>
  );
}
