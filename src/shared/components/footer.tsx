import { getTranslations } from "next-intl/server";

export async function Footer() {
  const t = await getTranslations("footer");

  return (
    <footer>
      <div className="container mx-auto py-8">
        <p className="text-center text-sm text-neutral-400">
          &copy; {new Date().getFullYear()} MyPortfolio.{" "}
          {t("allRightsReserved")}
        </p>
      </div>
    </footer>
  );
}
