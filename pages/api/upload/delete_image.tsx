import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { S3 } from 'aws-sdk'


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

  // connnect to S3
  const s3 = new S3({
    accessKeyId: process.env.B2_ACCESS_KEY_ID,
    secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
    region: process.env.B2_REGION,
    endpoint: process.env.B2_ENDPOINT,
  })

  // connect to bucket
  const bucket = process.env.B2_BUCKET || ''

  // delete file from bucket
  try {
    await s3.deleteObject({
      Bucket: bucket,
      Key: filename,
    }).promise()
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error deleting image' })
    return
  }

  res.status(200).json({ message: 'Success' })
}
