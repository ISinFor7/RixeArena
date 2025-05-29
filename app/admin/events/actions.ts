"use server"

import { createArticle, updateArticle } from "@/lib/admin"
import { Article } from "@/lib/articles";
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function createArticleAction(formData: Article): Promise<{ success: boolean; error?: string }> {
  try {
    // Basic validation
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      return { success: false, error: "Title, content, and author are required" }
    }

    const newArticle = await createArticle(formData)

    if (newArticle) {
      revalidatePath("/admin")
      revalidatePath("/")
      redirect("/admin")
    } else {
      return { success: false, error: "Failed to create article" }
    }
  } catch (error) {
    console.error("Error creating article:", error)
    return { success: false, error: "An error occurred while creating the article" }
  }
}

export async function updateArticleAction(
  id: string,
  formData: Article,
): Promise<{ success: boolean; error?: string }> {
  try {

    // Basic validation
    if (!formData.title.trim() || !formData.content.trim() || !formData.author.trim()) {
      return { success: false, error: "Title, content, and author are required" }
    }

    const updatedArticle = await updateArticle(id, formData)

    if (updatedArticle) {
      revalidatePath("/admin")
      revalidatePath("/")
      revalidatePath(`/articles/${id}`)
      redirect("/admin")
    } else {
      return { success: false, error: "Failed to update article" }
    }
  } catch (error) {
    console.error("Error updating article:", error)
    return { success: false, error: "An error occurred while updating the article" }
  }
}
