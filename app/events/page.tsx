import Image from "next/image";
import { getArticles } from "@/lib/articles";
import { ArticleList } from "@/components/article-list";

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function Calendrier() {
  const articles = await getArticles();
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-[32px] row-start-2 items-center sm:items-start">
        <h1 className="text-[40px] font-bold text-center sm:text-left">
          Page d'événements
        </h1>
        <p className="text-[20px] text-center sm:text-left">
          Evénements à venir, et passés.
        </p>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            Events futurs:
          </h1>
          <ArticleList articles={articles.futureEvents} />
        </div>
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl mb-8">
            Events passés:
          </h1>
          <ArticleList articles={articles.pastEvents} />
        </div>
      </main>
      <footer className="row-start-3 flex gap-[24px] flex-wrap items-center justify-center"></footer>
    </div>
  );
}
