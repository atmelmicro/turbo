import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export function LangSelector() {
  return (
    <div className="grid gap-2 p-2">
      <h1 className="text-xl font-medium">Set your language</h1>
      <form action={changeLang}>
        <button name="lang" value="cs">
          🇨🇿 čeština (Czech)
        </button>
      </form>
      <form action={changeLang}>
        <button name="lang" value="en">
          🇺🇸 English
        </button>
      </form>
      <form action={changeLang}>
        <button name="lang" value="de">
          🇩🇪 Deutch (German)
        </button>
      </form>
    </div>
  );
}

async function changeLang(fd: FormData) {
  "use server";
  cookies().set("Next-Locale", fd.get("lang")?.toString() ?? "cs");
  redirect("/");
}
