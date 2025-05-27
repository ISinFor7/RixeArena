import { MongoClient, ServerApiVersion, type Db, type Collection} from "mongodb"
import { Article } from "./articles"

if (!process.env.MONGODB_URI) {
  throw new Error("Please add your MongoDB URI to .env.local")
}

const uri = process.env.MONGODB_URI
const options = {
  serverApi: {
    version: ServerApiVersion.v1,
    strict: true,
    deprecationErrors: true,
  },
}

let client: MongoClient
let clientPromise: Promise<MongoClient>


client = new MongoClient(uri, options)
clientPromise = client.connect()


export default clientPromise

export const getCollectionsv2 = async () => {
  try {
    await client.connect();
    return client.db('egouts').collection<Article>('articles');
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not get MongoDB collection');
  }
}
export async function getDatabase(): Promise<Db> {
  const client = await clientPromise
  return client.db("egouts")
}
export async function getCollections(): Promise<Collection> {
  const db = await getDatabase()
  return db.collection("articles")
}
