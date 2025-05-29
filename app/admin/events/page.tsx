import { getArticles } from "@/lib/articles"
import { AdminArticleList } from "@/components/admin-article-list"
import { getAllTags, getAllAuthors } from "@/lib/filters"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { BookOpenIcon, UsersIcon, TagIcon, CalendarIcon } from "lucide-react"

export const revalidate = 0 // Don't cache admin pages

export default async function AdminDashboard() {
  const articles = await getArticles()
  const allTags = getAllTags(articles)
  const allAuthors = getAllAuthors(articles)

  // Calculate some statistics
  const recentArticles = articles.filter(
    (article) => new Date(article.date) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
  ).length

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold tracking-wider mb-2">ARTICLE MANAGEMENT</h1>
        <p className="text-muted-foreground">Manage your articles from this dashboard</p>
      </div>

      {/* Statistics Cards */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Articles</CardTitle>
            <BookOpenIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Authors</CardTitle>
            <UsersIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allAuthors.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Tags</CardTitle>
            <TagIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{allTags.length}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Recent (30 days)</CardTitle>
            <CalendarIcon className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{recentArticles}</div>
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
  )
}
