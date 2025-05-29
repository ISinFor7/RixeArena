import { getDatabase } from "./mongodb"
import { type Collection, ObjectId, WithId } from "mongodb"
import { User } from "next-auth"
import bcrypt from "bcryptjs"
import { Article } from "./articles"

function convertToUser(doc: any): User {
  return {
    ...doc,
    name: doc.name,
    admin: doc.admin ? doc.admin : false,
  }
}

async function getCollectionUsers(): Promise<Collection> {
  const db = await getDatabase()
  return db.collection("users")
}


export type ArticleInput = Omit<Article, "_id">;

export async function getUserFromDb(name:string,password:string): Promise<User | null> {
  try {
    const collection = await getCollectionUsers()
    const user = await collection.findOne({name: name},{ projection: { _id: 0, name: 1, admin:1, password:1} })
    if (user===undefined) {
      return null
    }
    if (!user) {
      return null
    }
    if (bcrypt.compareSync(password, user.password)) {
      return convertToUser(user)
    } else {
      return null
    }
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not get MongoDB collection');
  }
}

export async function getAllUsersFromDb(): Promise<User[]> {
  try {
    const collection = await getCollectionUsers()
    const users = await collection.find().toArray()
    return users.map(convertToUser)
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not get MongoDB collection');
  }
}

export async function createUserInDb(user: User): Promise<Boolean> {
  try {
    const collection = await getCollectionUsers()
    const result = await collection.insertOne(user)
    return result.acknowledged 
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not create user in MongoDB');
  }
}

export async function updateUserInDb(user: User): Promise<Boolean> {
  try {
    const collection = await getCollectionUsers()
    const result = await collection.findOneAndUpdate(
      { name: user.name },
      { $set: user },
      { returnDocument: 'after' }
    )
    if (!result || !result.value) {
      throw new Error('User not found')
    }
    return result.ok === 1
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not update user in MongoDB');
  }
}

export async function deleteUserFromDb(name: string): Promise<Boolean> {
  try {
    const collection = await getCollectionUsers()
    const result = await collection.deleteOne({ name: name })
    if (result.deletedCount === 0) {
      throw new Error('User not found')
    }
    const db = await getDatabase()
    await db.collection("banned").insertOne({"name":name})
    return result.acknowledged && result.deletedCount > 0
  } catch (error) {
    console.error('Error data:', error);
      throw new Error('Could not delete user from MongoDB');
    }
}

export async function Banned(name:string) {
  const db = await getDatabase()
  const user = await db.collection("banned").findOne({"name":name})
  if (user===undefined || !user || user===null) {
    return false
  }
  else {
    return true
  }
}

export async function createArticle(
  articleData: ArticleInput
): Promise<Boolean> {
  try {
    const db = await getDatabase()
    const collection = db.collection("articles")
    const result = await collection.insertOne(articleData)
    if (!result.acknowledged) {
      throw new Error('Failed to create article')
    }
    return true
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not create article in MongoDB');
  }
}

export async function updateArticle(
  id: string,
  articleData: ArticleInput
): Promise<any> {
  try {
    const db = await getDatabase()
    const collection = db.collection("articles")
    const result = await collection.findOneAndUpdate(
      { _id: new ObjectId(id) },
      { $set: articleData },
      { returnDocument: "after" }
    )
    return result;
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not update article in MongoDB');
  }
}

export async function deleteArticle(id: string): Promise<Boolean> {
  try {
    const db = await getDatabase()
    const collection = db.collection("articles")
    const result = await collection.deleteOne({ _id: new ObjectId(id) })
    return result.acknowledged && result.deletedCount > 0
  } catch (error) {
    console.error('Error data:', error);
    throw new Error('Could not delete article from MongoDB');
  }
}