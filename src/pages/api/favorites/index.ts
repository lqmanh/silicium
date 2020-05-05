import { NextApiRequest, NextApiResponse } from 'next'
import { favorites } from '../_firebase'

const add = async (entry: object) => {
  await favorites.add(entry)
}

const get = async () => {
  const snapshot = await favorites.get()
  const entries = snapshot.docs.map((doc) => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  })
  return entries
}

const update = async (id: string, entry: object) => {
  await favorites.doc(id).update(entry)
}

const deleteThenGet = async (id: string) => {
  await favorites.doc(id).delete()
  return get()
}

const clear = async () => {
  const snapshot = await favorites.get()
  await Promise.all(
    snapshot.docs.map(async (doc) => {
      await doc.ref.delete()
    })
  )
  return []
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      return res.status(200).json(await get())
    } else if (req.method === 'POST') {
      await add(req.body)

      return res.status(201).json({})
    } else if (req.method === 'PUT') {
      await update(req.query.id as string, req.body)

      return res.status(200).json({})
    } else if (req.method === 'DELETE') {
      const { id } = req.query
      const entries = id ? await deleteThenGet(id as string) : await clear()

      return res.status(200).json(entries)
    } else return res.status(405).json({})
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
