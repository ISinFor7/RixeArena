import { getArticles } from "@/lib/articles";
import { AdminArticleList } from "@/components/admin-article-list";
import { getAllTags, incomplets } from "@/lib/filters";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BookOpenIcon, UsersIcon, TagIcon, CalendarIcon } from "lucide-react";
import { auth } from "@/auth";
import { redirect } from 'next/navigation'
import { Banned } from "@/lib/admin";

export const revalidate = 0; // Don't cache admin pages

export default async function AdminDashboard() {
  const session = await auth();
  if (!session?.user || !session.user.admin || await Banned(session.user.name as string)) {
    redirect("/admin");
  }
  const articles = await getArticles();
  const allTags = getAllTags(articles);
  const incompletes = incomplets(articles);
  const nonPubliés = articles.filter(
    (article) =>
      article.published==false
  ).length;

  // Calculate some statistics
  const futurArticles = articles.filter(
    (article) =>
      new Date(article.date) > new Date(Date.now())
  ).length;

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-2">
          EVENTS MANAGEMENT
        </h1>
        <p className="text-muted-foreground">
          Gestion des articles des events
        </p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Total Articles
            </CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Articles non publiés</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{nonPubliés}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Incomplets</CardTitle>
            <TagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{incompletes.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">
              Futur Events
            </CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{futurArticles}</div>
          </CardContent>
        </Card>
      </div>

      <div className="rounded-lg border border-primary/30 bg-card/50 backdrop-blur-sm p-6">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold">All Articles</h2>
        </div>

        <AdminArticleList articles={articles} />
      </div>
    </div>
  );
}
