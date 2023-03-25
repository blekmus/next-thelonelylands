import { NextApiRequest, NextApiResponse } from 'next'
import { getSession } from 'next-auth/react'
import { copyFileSync } from 'fs'
import formidable from 'formidable'
import {join} from 'path'


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

    const image = files.file

    // write image to public/images/uploads
    const randomString = Math.random().toString(36).substring(2, 15)
    const filename = randomString + '_' + image.originalFilename
    const uploadPath = join('public/images/uploads', filename)

    // copy file to uploads folder
    copyFileSync(image.filepath, uploadPath)

    // return image url
    res.status(200).json({ url: filename })
  })
}