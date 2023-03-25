import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { unlinkSync } from 'fs'
import { join } from 'path'

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  const { filename } = JSON.parse(req.body)

  // delete file from public/images/uploads
  const uploadPath = join('public/images/uploads', filename)

  // delete file from uploads folder
  try {
    unlinkSync(uploadPath)
  } catch (err) {
    res.status(404).json({ message: 'File not found' })
    return
  }

  res.status(200).json({ message: 'Success' })
}
