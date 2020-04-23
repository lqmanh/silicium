import admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import serviceAccountKey from '../../../../service-account-key.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
    databaseURL: 'https://silicium-617ad.firebaseio.com',
  })
}
const db = admin.firestore()
const collection = db.collection('history')

const add = async (entry: object) => {
  await collection.add(entry)
}

const get = async () => {
  const snapshot = await collection.orderBy('request.timestamp', 'desc').get()
  const entries = snapshot.docs.map((doc) => {
    const id = doc.id
    const data = doc.data()
    return { id, ...data }
  })
  return entries
}

const deleteThenGet = async (id: string) => {
  await collection.doc(id).delete()
  return get()
}

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      return res.status(200).json(await get())
    } else if (req.method === 'POST') {
      const { request, response } = req.body
      await add({ request, response })

      return res.status(201).json({})
    } else if (req.method === 'DELETE') {
      const { id } = req.query

      return res.status(200).json(await deleteThenGet(id as string))
    } else return res.status(405).json({})
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
