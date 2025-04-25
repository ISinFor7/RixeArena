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
          Page d'évènements
        </h1>
        <div>
          <p className="text-[20px] text-center sm:text-left">
            Evénements à venir, et passés.
          </p>
          <p className="text-[16px] text-center sm:text-left">
            (cliquez sur les évènements pour + d'infos)
          </p>
        </div>
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
/*
//import { getArticles } from "@/lib/articles"
import { ArticleList } from "@/components/article-list"

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function Home() {
  const articles = await getArticles()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-widest sm:text-5xl uppercase">RETROWAVE ARTICLES</h1>
        <div className="h-1 w-40 bg-gradient-to-r from-primary via-secondary to-accent mx-auto my-4"></div>
        <p className="mt-4 text-xl text-muted-foreground">DISCOVER THE FUTURE OF THE PAST</p>
      </div>

      <div className="articles-container">
        <ArticleList articles={articles} />
      </div>
    </main>
  )
}

*/

/*
import { getArticles } from "@/lib/articles"
import { ArticleList } from "@/components/article-list"

export const revalidate = 60 // Revalidate this page every 60 seconds

export default async function Home() {
  const articles = await getArticles()

  return (
    <main className="container mx-auto px-4 py-8">
      <div className="mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-widest sm:text-5xl uppercase">RETROWAVE ARTICLES</h1>
        <div className="h-1 w-40 bg-gradient-to-r from-primary via-secondary to-accent mx-auto my-4"></div>
        <p className="mt-4 text-xl text-muted-foreground">DISCOVER THE FUTURE OF THE PAST</p>
      </div>

      <div className="articles-container">
        <ArticleList articles={articles} />
      </div>
    </main>
  )
}

*/