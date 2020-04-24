import { RawTrapMessage, TrapHandler } from '@lqmanh/boracium'
import { NextApiRequest, NextApiResponse } from 'next'
import { trapLog } from '../_firebase'

const handler = new TrapHandler({ serverless: true })

const add = async (message: RawTrapMessage) => {
  await trapLog.add(await handler.parse(message))
}

const get = async () => {
  const snapshot = await trapLog.orderBy('timestamp', 'desc').get()
  const entries = snapshot.docs.map((doc) => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  })
  return entries
}

const deleteThenGet = async (id: string) => {
  await trapLog.doc(id).delete()
  return get()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      return res.status(200).json(await get())
    } else if (req.method === 'POST') {
      await add(req.body)

      return res.status(201).json({})
    } else if (req.method === 'DELETE') {
      const { id } = req.query

      return res.status(200).json(await deleteThenGet(id as string))
    } else return res.status(405).json({})
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
