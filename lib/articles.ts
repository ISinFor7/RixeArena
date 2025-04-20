import { mockDb, type Article } from "@/lib/mock-db"

export type { Article } from "@/lib/mock-db"

/*import clientPromise from "./mongodb"
import { ObjectId } from "mongodb"

export type Article = {
  _id: string
  published:boolean
  title: string
  content: string
  date: Date
  lieu: string
  frais?: number
  imageUrl?: string
  tags?: string[]
  excerpt?: string
  privateComs?: string
}

export async function getArticles() {
  try {
    const client = await clientPromise
    const db = client.db()

    const articles = await db.collection("articles").find({}).sort({ createdAt: -1 }).limit(50).toArray()

    return JSON.parse(JSON.stringify(articles)) as Article[]
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return []
  }
}

export async function getArticleById(id: string) {
  try {
    const client = await clientPromise
    const db = client.db()

    const article = await db.collection("articles").findOne({ _id: new ObjectId(id) })

    if (!article) {
      return null
    }

    return JSON.parse(JSON.stringify(article)) as Article
  } catch (error) {
    console.error(`Failed to fetch article with id ${id}:`, error)
    return null
  }
}*/


export async function getArticles(): Promise<{ futureEvents: Article[]; pastEvents: Article[] }> {
  try {
    const futureEvents = await mockDb.getFuturEvents();
    const pastEvents = await mockDb.getPastEvents();
    return { futureEvents, pastEvents };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return { futureEvents: [], pastEvents: [] };
  }
}

export async function getArticleById(id: string): Promise<Article | null> {
  try {
    return await mockDb.getArticleById(id)
  } catch (error) {
    console.error(`Failed to fetch article with id ${id}:`, error)
    return null
  }
}
