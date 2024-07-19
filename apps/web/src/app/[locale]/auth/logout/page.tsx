"use client";

import { Text, Flex } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { FormButton } from "@/components/form";
import { logout } from "@/backend/auth";
import { StatusBadge } from "@/components/badge";

export default function LoginPage() {
  const [state, formAction] = useFormState(logout, {});

  return (
    <>
      <Flex align="center" justify="between">
        <Text className="w-20" size="4" weight="medium">
          Log out
        </Text>
        <StatusBadge status={state} />
      </Flex>
      <Text>Are you sure you want to log out?</Text>
      <form action={formAction}>
        <FormButton className="w-full">Log out</FormButton>
      </form>
    </>
  );
}
