"use client";

import { Flex, Heading } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { Field, FormButton } from "@/components/form";
import { StatusBadge } from "@/components/badge";
import { changePassword } from "@/backend/auth";

export default function SecurityPage() {
  const [state, formAction] = useFormState(changePassword, {});

  return (
    <div className="grid w-full gap-5">
      <Flex align="center" gap="2">
        <Heading weight="medium">Change password</Heading>
        <StatusBadge status={state} />
      </Flex>
      <form action={formAction} className="flex max-w-xs flex-col gap-2">
        <Field
          className="w-full"
          id="oldPassword"
          label="Old password"
          type="password"
        />
        <Field
          className="w-full"
          id="newPassword"
          label="New password"
          type="password"
        />
        <FormButton className="w-fit">Change</FormButton>
      </form>
    </div>
  );
}
