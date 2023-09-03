// Import Next.js types
import type { NextApiRequest, NextApiResponse } from 'next'
// Import Prisma
import { PrismaClient } from '@prisma/client'

// Define API route handler with TypeScript types
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const prisma = new PrismaClient();

  try {
    const users = await prisma.user.findMany();
    res.status(200).json(users);
  } catch (e) {
    res.status(500).json({ error: 'Unable to fetch data' });
  } finally {
    await prisma.$disconnect();
  }
}
