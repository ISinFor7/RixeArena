import { getArticleById } from "@/lib/articles";
import { CalendarIcon, User2Icon, TagIcon, ArrowLeftIcon, MapPin } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageProps } from "@/.next/types/app/page";
import { MDXRemote } from 'next-mdx-remote-client/rsc'

export const revalidate = 60; // Revalidate this page every 60 seconds

export default async function ArticlePage({ params }: PageProps) {

  const p = await params;
  if (!p || !p.id) {
    notFound();
  }
  const article = await getArticleById(p.id);
  if (!article) {
    notFound();
  }
  const formattedDate = article.date.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const formattedDateFin = article.dateFin.toLocaleDateString("fr-FR", {
    year: "numeric",
    month: "long",
    day: "numeric",
  })
  const lieu = article.adresse || article.ville;
  return (
    <div className="container mx-auto px-4 py-8">
      <a href="/events" className="mb-8 inline-block">
        <Button variant="ghost" className="gap-2">
          <ArrowLeftIcon className="h-4 w-4" />
          Retour au calendrier
        </Button>
      </a>

      <article className="mx-auto max-w-6xl">
        {/* Header section with image and title side by side */}
        <div className="flex flex-col lg:flex-row gap-8 mb-8">
          {/* Image - Half width on large screens */}
          {article.imageUrl && (
            <div className="w-full lg:w-1/2 flex-shrink-0">
              <div className="relative overflow-hidden rounded-lg border border-primary/30 shadow-[0_0_15px_rgba(255,0,255,0.2)]">
                <img
                  src={article.imageUrl || "/placeholder.svg"}
                  alt={article.title}
                  className="h-auto w-full object-cover aspect-video"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
              </div>
            </div>
          )}

          {/* Title and metadata - Half width on large screens */}
          <div className="w-full lg:w-1/2 flex flex-col justify-center">
            <h1 className="text-3xl lg:text-4xl xl:text-5xl font-bold tracking-tight mb-4 leading-tight">
              {article.title}
            </h1>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="h-5 w-5 text-secondary" />
              <span className="font-medium">{lieu}</span>
            </div>
            <div className="flex items-center gap-2 mb-4">
              <CalendarIcon className="h-5 w-5 text-secondary" />
              <span>{formattedDate}</span>
              -
              <span>{formattedDateFin}</span>
            </div>

            {/* Tags */}
            {article.tags && article.tags.length > 0 && (
              <div className="flex items-center gap-2 mb-6">
                <TagIcon className="h-5 w-5 text-secondary" />
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <Badge
                      key={tag}
                      variant="outline"
                      className="text-sm border-primary/30 hover:border-primary/60 transition-colors"
                    >
                      {tag}
                    </Badge>
                  ))}
                </div>
              </div>
            )}
            {article.shortDesc && (
              <div className="p-4 rounded-lg bg-card/50 border border-primary/20 shadow-[0_0_10px_rgba(255,0,255,0.1)]">
                <p className="text-lg text-muted-foreground leading-relaxed italic">{article.shortDesc}</p>
              </div>
            )}
          </div>
        </div>

        {/* Article content */}
        <div className="prose prose-slate max-w-none dark:prose-invert prose-lg">
          <div className="bg-card/30 rounded-lg p-8 border border-primary/20 shadow-[0_0_15px_rgba(255,0,255,0.1)]">
            <MDXRemote source={article.content} />
          </div>
        </div>
      </article>
    </div>
  )
}
