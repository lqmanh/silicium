import admin from 'firebase-admin'
import serviceAccountKey from '../../../service-account-key.json'

if (!admin.apps.length) {
  admin.initializeApp({
    credential: admin.credential.cert(serviceAccountKey as admin.ServiceAccount),
    databaseURL: 'https://silicium-617ad.firebaseio.com',
  })
}
const db = admin.firestore()

export const snmpClientHistory = db.collection('snmp-client-history')
export const trapLog = db.collection('trap-log')
