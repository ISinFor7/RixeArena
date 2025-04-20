import { v4 as uuidv4 } from "uuid"

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

// Sample image URLs for our mock articles
const sampleImages = [
  "https://images.unsplash.com/photo-1496128858413-b36217c2ce36?q=80&w=1000",
  "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?q=80&w=1000",
  "https://images.unsplash.com/photo-1513001900722-370f803f498d?q=80&w=1000",
  "https://images.unsplash.com/photo-1581276879432-15e50529f34b?q=80&w=1000",
  "https://images.unsplash.com/photo-1546074177-ffdda98d214f?q=80&w=1000",
]

// Generate lorem ipsum paragraphs
function generateLoremIpsum(paragraphs: number): string {
  const lorem = [
    "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam euismod, nisl eget aliquam ultricies, nunc nisl aliquet nunc, quis aliquam nisl nunc quis nisl.",
    "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo.",
    "Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt.",
    "Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora incidunt ut labore et dolore magnam aliquam quaerat voluptatem.",
    "Ut enim ad minima veniam, quis nostrum exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur.",
    "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident.",
    "Similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio.",
  ]

  const result = []
  for (let i = 0; i < paragraphs; i++) {
    result.push(lorem[i % lorem.length])
  }
  return result.join("\n\n")
}

// Create sample articles
const createSampleArticles = (): Article[] => {
  const articles: Article[] = [
    {
      _id: uuidv4(),
      title: "Caramanga",
      published: true,
      content: generateLoremIpsum(5),
      author: "Mick",
      date: new Date(2023, 11, 15),
      dateFin: new Date(2023, 11, 17),
      ville: "Caraman, France",
      frais: 5,
      imageUrl: sampleImages[0],
      tags: ["Cosplay", "Gaming", "Caraman"],
      shortDesc:
        "On se retrouve encore une fois cette année à Caraman.",
    },
    {
      _id: uuidv4(),
      title: "Albi Game Festival",
      published: true,
      content: generateLoremIpsum(4),
      author: "Mick",
      date: new Date(2023, 10, 22),
      dateFin: new Date(2023, 11, 27),
      ville: "Albi, France",
      frais: 5,
      imageUrl: sampleImages[1],
      tags: ["Cosplay", "Gaming", "Albi"],
      shortDesc:
        "Première édition de l'albi game festival où nous sommes invités pour organiser les tournois.",
    },
    {
      _id: uuidv4(),
      title: "Urban Festival arena",
      published: true,
      content: generateLoremIpsum(6),
      author: "Mick",
      date: new Date(2023, 11, 5),
      dateFin: new Date(2023, 11, 7),
      adresse: "Salle patus cremat 7 Rue des Muettes Albi, Tarn 81000 France",
      ville: "Albi, France",
      imageUrl: sampleImages[2],
      tags: ["Summer", "Tournoi", "Albi"],
      shortDesc:
        "Oui... Nous revenons a l'Urban Festival. On vous propose 4 tournois lors de cette édition! ",
    },
    {
      _id: uuidv4(),
      title: "MixUp 2024",
      published: true,
      content: generateLoremIpsum(4),
      author: "Mick",
      date: new Date(2026, 9, 18),
      dateFin: new Date(2026, 9, 19),
      ville: "Lyon, France",
      frais: 10,
      imageUrl: sampleImages[3],
      tags: ["Tournoi", "MixUp", "Lyon"],
      shortDesc:
        "3ème année de suite ou nous nous rendons au MixUp. Vous voulez vous joindre a nous ? C'est possible !",
    },
  ]
  return articles
}

// Create our mock database
class MockDatabase {
  private articles: Article[]

  constructor() {
    this.articles = createSampleArticles()
    this.articles = this.articles.filter((article) => article.published === true)
  }

  async getArticles(): Promise<Article[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    return [...this.articles].sort((a, b) => b.date.getTime() - a.date.getTime())
  }

  async getFuturEvents(): Promise<Article[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    const articles = this.articles.filter((article) => article.dateFin > new Date())
    return [...articles].sort((a, b) => a.date.getTime() - b.date.getTime())
  }
  
  async getPastEvents(): Promise<Article[]> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 500))
    const articles = this.articles.filter((article) => article.dateFin < new Date())
    return [...articles].sort((a, b) => b.date.getTime() - a.date.getTime())
  }


  async getArticleById(id: string): Promise<Article | null> {
    // Simulate network delay
    await new Promise((resolve) => setTimeout(resolve, 300))
    const article = this.articles.find((article) => article._id === id)
    return article || null
  }
}

// Export a singleton instance
export const mockDb = new MockDatabase()
