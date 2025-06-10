import { createArticle } from "@/lib/admin"
import { type NextRequest, NextResponse } from "next/server"
import { revalidatePath } from "next/cache"

export async function POST(request: NextRequest) {
  try {
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
        published: formData.get("published") === "on",
        date: new Date(formData.get("date") as string).toISOString().split('T')[0],
        dateFin: new Date(formData.get("dateFin") as string),
        ville: formData.get("ville") as string,
      }

    // Basic validation
    if (!articleData.title || !articleData.content || !articleData.author) {
      return NextResponse.json({ success: false, error: "Title, content, and author are required" }, { status: 400 })
    }
    const newArticle = await createArticle(articleData)

    if (newArticle) {
      revalidatePath("/admin")
      revalidatePath("/")

      // Return a redirect response
      return NextResponse.redirect(new URL("/admin", request.url))
    } else {
      return NextResponse.json({ success: false, error: "Failed to create article" }, { status: 500 })
    }
  } catch (error) {
    console.error("Error creating article:", error)
    return NextResponse.json({ success: false, error: "An error occurred while creating the article" }, { status: 500 })
  }
}
