import { getArticleById } from "@/lib/articles"
import { ArticleForm } from "@/components/article-form"
import { notFound } from "next/navigation"
import { PageProps } from "@/.next/types/app/page"

export default async function EditArticlePage({ params }: PageProps) {
  const p = await params;
  if (!p || !p.id) {
    notFound();
  }
  const article = await getArticleById(p.id)

  if (!article) {
    notFound()
  }

  // Ensure article has _id property
  const articleWithId = article ? { ...article, _id: p.id } : undefined

  return <ArticleForm article={articleWithId} mode="edit" />
}
