import admin from 'firebase-admin'
import { NextApiRequest, NextApiResponse } from 'next'
import serviceAccountKey from '../../../../service-account-key.json'

admin.initializeApp({
  credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
  databaseURL: 'https://silicium-617ad.firebaseio.com',
})
const db = admin.firestore()

export default async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ iam: '/api/history' })
}
