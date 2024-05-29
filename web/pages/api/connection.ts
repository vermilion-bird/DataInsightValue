// pages/api/connection.ts

import { NextApiRequest, NextApiResponse } from 'next';
import { PrismaClient, Connection } from '@prisma/client';

const prisma = new PrismaClient();

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method === 'POST') {
    const { connectionName, hostURL, port, database, username, password } = req.body;
    const portNumber = parseInt(port, 10);

    if (!connectionName || !hostURL || isNaN(portNumber) || !database || !username || !password) {
      return res.status(400).json({ message: 'All fields are required.' });
    }

    try {
      const connection: Connection = await prisma.connection.create({
        data: {
          connectionName,
          hostURL,
          port: portNumber,
          database,
          username,
          password,
          // useSSL: useSSL, // 如果你添加了这个字段
        },
      });
      return res.status(200).json(connection);
    } catch (error) {
      console.error('Failed to create connection:', error);
      return res.status(500).json({ message: 'Failed to create connection', error: error.message });
    }
  } else {
    res.setHeader('Allow', ['POST']);
    res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
