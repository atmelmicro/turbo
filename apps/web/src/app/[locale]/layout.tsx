import { type ReactElement } from "react";
import { setStaticParamsLocale } from "next-international/server";
import { I18nProviderClient } from "@/locales/client";
import { getI18n } from "@/locales/server";
import { PHProvider, PostHogPageview } from "@/posthog/provider";
import { Navbar } from "@/components/nav";
import { AuthPopup } from "@/components/authpopup";
import { Footer } from "@/components/footer";

export async function generateMetadata() {
  const t = await getI18n();
  return {
    title: "MAT Development",
    desc: t("desc"),
  };
}

export default function SubLayout({
  params: { locale },
  children,
}: {
  params: { locale: string };
  children: ReactElement;
}) {
  setStaticParamsLocale(locale);

  return (
    <I18nProviderClient locale={locale}>
      <PHProvider>
        <PostHogPageview />
        <Navbar>
          <AuthPopup />
        </Navbar>
        <div className="mb-10 min-h-screen">{children}</div>
        <Footer />
      </PHProvider>
    </I18nProviderClient>
  );
}
