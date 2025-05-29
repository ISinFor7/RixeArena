import { updateArticle } from "@/lib/admin"
import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const id = searchParams.get("id")

    if (!id) {
      return NextResponse.json({ success: false, error: "Article ID is required" }, { status: 400 })
    }

    const formData = await request.formData()

    const articleData = {
        title: formData.get("title") as string,
        content: formData.get("content") as string,
        author: formData.get("author") as string,
        shortDesc: formData.get("shortDesc") as string,
        imageUrl: formData.get("imageUrl") as string,
        tags: (formData.get("tags") as string)
        .split(",")
        .map((tag) => tag.trim())
        .filter((tag) => tag.length > 0),
        published: false,
        date: new Date(formData.get("date") as string),
        dateFin: new Date(formData.get("dateFin") as string),
        ville: formData.get("ville") as string,
      }

    // Basic validation
    if (!articleData.title.trim() || !articleData.content.trim() || !articleData.author.trim()) {
      return NextResponse.json({ success: false, error: "Title, content, and author are required" }, { status: 400 })
    }

    const updatedArticle = await updateArticle(id, articleData)

    if (updatedArticle) {
      revalidatePath("/admin")
      revalidatePath("/")
      revalidatePath(`/articles/${id}`)

      // Return a redirect response
      return NextResponse.redirect(new URL("/admin", request.url))
    } else {
      return NextResponse.json({ success: false, error: "Failed to update article" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error updating article:", error)
    return NextResponse.json({ success: false, error: "An error occurred while updating the article" }, { status: 500 })
  }
}
