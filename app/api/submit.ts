import type { NextApiRequest, NextApiResponse } from 'next'
import { createArticle } from '@/lib/admin'
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const data = req.body
  const id = await createArticle(data)
  res.status(200).json({ id })
}