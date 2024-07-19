"use client";

import { Heading } from "@radix-ui/themes";
import { useFormState } from "react-dom";
import { Field, FormButton } from "@/components/form";
import { edit } from "@/backend/auth";
import { StatusBadge } from "@/components/badge";

export function EditForm({ email, name }: { email: string; name: string }) {
  const [state, formAction] = useFormState(edit, {});
  return (
    <section className="grid gap-1">
      <div className="flex items-center gap-2">
        <Heading weight="medium">Info</Heading>
        <StatusBadge status={state} />
      </div>
      <form action={formAction} className="grid max-w-lg gap-2">
        <Field defaultValue={name} id="username" label="Username" />
        <Field defaultValue={email} id="email" label="Email" />
        <FormButton className="w-fit">Save</FormButton>
      </form>
    </section>
  );
}
