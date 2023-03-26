import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { readFileSync } from 'fs'
import formidable from 'formidable'
import { S3 } from 'aws-sdk'

export const config = {
  api: {
    bodyParser: false,
  },
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await getSession({ req })

  if (!session) {
    res.status(401).json({ error: 'Not authenticated' })
    return
  }

  const form = new formidable.IncomingForm()

  form.parse(req, async (err, _fields, files) => {
    if (err) {
      console.error(err)
      res.status(500).json({ message: 'Error parsing form data' })
      return
    }

    // if files.file is of type formidable.File[] return
    if (Array.isArray(files.file)) {
      res.status(400).json({ message: 'Only one file allowed' })
      return
    }

    const imageInfo = files.file

    // generate random string for filename
    const randomString = Math.random().toString(36).substring(2, 15)
    const filename = randomString + '_' + imageInfo.originalFilename

    // connnect to B2
    const s3 = new S3({
      accessKeyId: process.env.B2_ACCESS_KEY_ID,
      secretAccessKey: process.env.B2_SECRET_ACCESS_KEY,
      region: process.env.B2_REGION,
      endpoint: process.env.B2_ENDPOINT,
    })

    // connect to bucket
    const bucket = process.env.B2_BUCKET || ''
    const imageBlob = readFileSync(imageInfo.filepath)

    const upload = s3.upload({
      Bucket: bucket,
      Key: filename,
      Body: imageBlob,
    })

    upload.send((err) => {
      if (err) {
        console.error(err)
        res.status(500).json({ message: 'Error uploading file' })
        return
      }

      res.status(200).json({ url: filename })
    })
  })
}
