"use server"

import { deleteArticle } from "@/lib/admin"
import { revalidatePath } from "next/cache"

export async function deleteArticleAction(id: string): Promise<{ success: boolean; error?: string }> {
  try {
    const success = await deleteArticle(id)

    if (success) {
      // Revalidate the admin page to refresh the article list
      revalidatePath("/admin")
      return { success: true }
    } else {
      return { success: false, error: "Failed to delete article" }
    }
  } catch (error) {
    console.error("Error deleting article:", error)
    return { success: false, error: "An error occurred while deleting the article" }
  }
}
