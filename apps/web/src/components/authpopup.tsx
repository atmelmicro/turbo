"use client";

import { ListItem } from "./nav";
import useSWR from "swr";
import { actionAuth } from "./auth.actions";
import { Spinner } from "@radix-ui/themes";

export function AuthPopup() {
  const { data, error, isLoading, isValidating } = useSWR("user", actionAuth);

  if (isLoading || isValidating) return <Spinner className="mx-auto" />;
  if (error) return <p>error</p>;
  return (
    <>
      <p className="text-center text-lg font-medium">
        {data ? `Hey ${data.username}` : "You are logged out."}
      </p>
      <div className="mx-auto h-2 w-2 rounded-full bg-stone-300" />{" "}
      {data ? (
        <>
          <ListItem href="/account" title="Account" />
          <ListItem href="/auth/logout" title="Log out" />
        </>
      ) : (
        <>
          <ListItem href="/auth/login" title="Login" />
          <ListItem href="/auth/register" title="Register" />
        </>
      )}
    </>
  );
}
