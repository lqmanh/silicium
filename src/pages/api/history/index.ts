import admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import serviceAccountKey from '../../../../service-account-key.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL: 'https://silicium-617ad.firebaseio.com',
})
const db = admin.firestore()
const collection = db.collection('history')

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method === 'GET') {
      const snapshot = await collection.get()
      const entries = snapshot.docs.map((doc) => doc.data())

      return res.status(200).json(entries)
    } else if (req.method === 'POST') {
      const { request, response } = req.body
      await collection.add({ request, response })

      return res.status(201).json({})
    } else return res.status(405).json({})
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
