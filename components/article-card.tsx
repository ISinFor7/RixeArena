import Link from "next/link"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/card"
import { CalendarIcon, User2Icon, TagIcon, MapPin, Banknote } from "lucide-react"
import { Badge } from "@/components/badge"
import type { Article } from "@/lib/articles"

interface ArticleCardProps {
  article: Article
}

export function ArticleCard({ article }: ArticleCardProps) {
    const getLocal = "fr-FR"
  const formattedDate =
    article.date instanceof Date
      ? article.date.toLocaleDateString(getLocal, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
      : new Date(article.date).toLocaleDateString(getLocal, {
          year: "numeric",
          month: "long",
          day: "numeric",
        })
    const nbTags = 3 // Number of tags to display before the "more" badge

  return (
    <Link href={`/articles/${article._id}`}>
      <Card className="h-full overflow-hidden transition-all hover:shadow-lg">
        {article.imageUrl && (
          <div className="aspect-video w-full overflow-hidden">
            <img
              src={article.imageUrl || "/placeholder.svg"}
              alt={article.title}
              className="h-full w-full object-cover transition-all hover:scale-105"
            />
          </div>
        )}
        <CardHeader>
          <CardTitle className="line-clamp-2">{article.title}</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="line-clamp-3 text-muted-foreground">
            {article.shortDesc /*|| article.content.substring(0, 150) + "..."*/}
          </p>
        </CardContent>
        <CardFooter className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <User2Icon className="h-4 w-4" />
            <span>{article.author}</span>
          </div>
          <div className="flex items-center gap-1">
            <CalendarIcon className="h-4 w-4" />
            <span>{formattedDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="h-4 w-4" />
            <span>{article.ville}</span>
            </div>
          {article.frais && (
            <div className="flex items-center gap-1">
              <Banknote className="h-4 w-4" />
              <span>{article.frais}</span>
            </div>
          )}
          {article.tags && article.tags.length > 0 && (
            <div className="flex items-center gap-1">
              <TagIcon className="h-4 w-4" />
              <div className="flex flex-wrap gap-1">
                {article.tags.slice(0, nbTags).map((tag) => (
                  <Badge key={tag} variant="outline" className="text-xs">
                    {tag}
                  </Badge>
                ))}
                {article.tags.length > nbTags && (
                  <Badge variant="outline" className="text-xs">
                    +{article.tags.length - nbTags}
                  </Badge>
                )}
              </div>
            </div>
          )}
        </CardFooter>
      </Card>
    </Link>
  )
}
