import { SnmpClient } from '@lqmanh/boracium'
import { NextApiRequest, NextApiResponse } from 'next'

export default async (req: NextApiRequest, res: NextApiResponse) => {
  try {
    if (req.method !== 'POST') return res.status(405).json({})

    const { host, port, version, community, oid, method } = req.body

    // no support for SNMP v3 yet
    if (version === '3') return res.status(400).json({ msg: 'SNMP_V3_NOT_SUPPORTED' })

    const client = new SnmpClient({ host, port, version, community })

    let varbinds
    const start = Date.now()
    if (method === 'GET') varbinds = await client.get(oid)
    else if (method === 'GETNEXT') varbinds = await client.getNext(oid)
    else if (method === 'GETBULK') varbinds = await client.getBulk(oid)
    else return res.status(400).json({ msg: 'SNMP_METHOD_UNKNOWN' })
    const end = Date.now()

    return res.json({ varbinds, snmpDelay: end - start })
  } catch (err) {
    return res.status(500).json({ msg: err.message })
  }
}
