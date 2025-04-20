import { Loader2 } from "lucide-react"

export default function ArticleLoading() {
  return (
    <div className="container mx-auto flex min-h-[70vh] flex-col items-center justify-center px-4 py-16">
      <Loader2 className="h-12 w-12 animate-spin text-primary" />
      <p className="mt-4 text-lg font-medium">Loading article...</p>
    </div>
  )
}
