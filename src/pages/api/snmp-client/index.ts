import { SnmpClient, User } from '@lqmanh/boracium'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({})

    const { host, port, version, community, user, oid, method } = req.body

    const client = new SnmpClient({
      host,
      port,
      version,
      community,
      user: new User(user.username, {
        authProtocol: user.authProtocol,
        authPassword: user.authPassword,
        privProtocol: user.privProtocol,
        privPassword: user.privPassword,
      }),
    })

    let varbinds
    const start = Date.now()
    if (method === 'GET') varbinds = await client.get(oid)
    else if (method === 'GETNEXT') varbinds = await client.getNext(oid)
    else if (method === 'GETBULK') varbinds = await client.getBulk(oid)
    else if (method === 'WALK') varbinds = await client.walk()
    else return res.status(400).json({ msg: 'SNMP_METHOD_UNKNOWN' })
    const end = Date.now()

    return res.json({ varbinds, snmpDelay: end - start })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
