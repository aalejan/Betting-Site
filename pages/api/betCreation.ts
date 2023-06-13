// pages/api/bets.ts

import { PrismaClient, BetType } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";

const prisma = new PrismaClient();

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // Retrieve user session
  const userSession = await getServerSession(req, res, authOptions);
  // If user is not logged in, return an error
  if (!userSession?.user) {
    return res.status(403).json({ error: "Not logged in" });
  }
  if (req.method === "POST") {
    const { userId, teamBetOn, teamBetAgainst, amount, type } = req.body;

    // Validation can be added here to ensure that all required fields are filled out

    try {
      const bet = await prisma.bet.create({
        data: {
          userId,
          teamBetOn,
          teamBetAgainst,
          amount,
          type: BetType[type as keyof typeof BetType],
          createdAt: new Date(),
          updatedAt: new Date(),
        },
      });

      res.json(bet);
    } catch (error) {
      res.status(500).json({ error: `Error creating bet: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
