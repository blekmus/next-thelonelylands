import { NextApiRequest, NextApiResponse } from 'next'
import prisma from '../../../lib/prisma'

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method !== 'POST' && req.headers.authorization) {
    return res.status(418).json({ message: 'I am a teapot' })
  }

  if (req.headers.authorization !== `Bearer ${process.env.BACKUP_TOKEN}`) {
    return res.status(418).json({ message: 'I am a teapot' })
  }

  return res.status(200).json(await prisma.entry.findMany())
}

export default handler
