import { getCollections } from "./mongodb"
import { ObjectId } from "mongodb"

export type Article = {
  _id: string
  published:boolean
  title: string
  content: string
  author: string
  date: Date
  dateFin: Date
  adresse?: string
  ville: string
  frais?: number
  imageUrl: string
  tags?: string[]
  shortDesc: string
  website?: string
  privateComs?: string
}



function convertToArticle(doc: any): Article {
  return {
    ...doc,
    _id: doc._id.toString(),
    date: new Date(doc.date),
    dateFin: new Date(doc.dateFin),
  }
}

export async function getFuturEvents() {
  try {
    const collection = await getCollections()
    const articles = await collection.find({}).sort({ createdAt: -1 }).toArray()

    return articles.map(convertToArticle)
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return []
  }
}

export async function getPastEvents() {
  try {
    const collection = await getCollections()

    const articles = await collection.find({}).sort({ createdAt: -1 }).limit(50).toArray()

    return articles.map(convertToArticle)
  } catch (error) {
    console.error("Failed to fetch articles:", error)
    return []
  }
}

export async function getArticleById(id: string) {
  try {
    const collection = await getCollections()

    const article = await collection.findOne({ id: new ObjectId(id) })

    if (!article) {
      return null
    }

    return JSON.parse(JSON.stringify(article)) as Article
  } catch (error) {
    console.error(`Failed to fetch article with id ${id}:`, error)
    return null
  }
}

export async function getNextEvent() {
  try {
    const collection = await getCollections()
    const filter = { dateFin: { $gte: new Date().toISOString().split('T')[0] }, published: true }
    const article = await collection.find(filter).sort({date: 1}).limit(1).toArray()
    if (article.length === 0) {
      return null
    }
    return convertToArticle(article[0]) as Article;
  } catch (error) {
    console.error("Failed to fetch next event:", error)
    return null
  }
}

export async function getArticles(): Promise<{ futureEvents: Article[]; pastEvents: Article[] }> {
  try {
    const collection = await getCollections()
    const articles = await collection.find({}).sort({ createdAt: -1 }).toArray()
    const convertedArticles = articles.map(convertToArticle);
    const futureEvents = convertedArticles.filter((article: Article) => article.dateFin >= new Date() && article.published);
    const pastEvents = convertedArticles.filter((article: Article) => article.dateFin < new Date() && article.published);
    return { futureEvents, pastEvents };
  } catch (error) {
    console.error("Failed to fetch articles:", error);
    return { futureEvents: [], pastEvents: [] };
  }
}
