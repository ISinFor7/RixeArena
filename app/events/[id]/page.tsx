import { getArticleById } from "@/lib/articles";
import { CalendarIcon, User2Icon, TagIcon, ArrowLeftIcon } from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { notFound } from "next/navigation";
import { PageProps } from "@/.next/types/app/page";
export const revalidate = 60; // Revalidate this page every 60 seconds


export default async function ArticlePage({ params }: PageProps) {
  const p = await params;
  if (!p || !p.id) {
    notFound();
  }
  const article = await getArticleById(p.id);
  console.log("Article:", !article);
  if (!article) {
    notFound();
  }
  return (
    <div className="container mx-auto px-4 py-8"> 
      {article.title} 
    </div>
  )
}
