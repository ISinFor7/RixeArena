import { getArticleById } from "@/lib/articles"
import { ArticleForm } from "@/components/article-form"
import { notFound } from "next/navigation"
import { PageProps } from "@/.next/types/app/page"
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
import { Banned } from "@/lib/admin";

export const revalidate = 0; // Don't cache admin pages

export default async function EditArticlePage({ params }: PageProps) {
  const session = await auth();
    if (!session?.user || !session.user.admin|| await Banned(session.user.name as string)) {
      redirect("/admin");
    }
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
