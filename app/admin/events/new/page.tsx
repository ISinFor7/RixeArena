import { ArticleForm } from "@/components/article-form"
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
import { Banned } from "@/lib/admin";

export const revalidate = 0; // Don't cache admin pages

export default async function NewArticlePage() {
  const session = await auth();
    if (!session?.user || !session.user.admin || await Banned(session.user.name as string)) {
      redirect("/admin");
    }
  return <ArticleForm mode="create" />
}
