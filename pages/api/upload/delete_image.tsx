import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { DeleteObjectCommand, S3Client } from '@aws-sdk/client-s3'

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

  // connnect to B2
  const client = new S3Client({
    endpoint: process.env.B2_ENDPOINT,
    region: process.env.B2_REGION,
  })

  // connect to bucket
  const bucket = process.env.B2_BUCKET || ''

  // create command
  const command = new DeleteObjectCommand({
    Bucket: bucket,
    Key: filename,
  })

  // delete file from bucket
  try {
    await client.send(command)
    res.status(200).json({ message: 'Success' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error deleting image' })
    return
  }
}
