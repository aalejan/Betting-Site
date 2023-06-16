// pages/api/bets.ts

import { PrismaClient, BetType, BetStatus, BetOutcome } from "@prisma/client";
import { authOptions } from "./auth/[...nextauth]";
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";

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
  const userId = userSession.user?.id;

  if (req.method === "POST") {
    const {
      teamBetOn,
      teamBetAgainst,
      amount,
      type,
      betStatus,
      oddsTaken,
      profitOrLoss,
      potentialWinnings,
      betOutcome,
    } = req.body;

    // Validation can be added here to ensure that all required fields are filled out

    try {
      const bet = await prisma.bet.create({
        data: {
          userId,
          teamBetOn,
          teamBetAgainst,
          oddsTaken,
          amount,
          type: BetType[type as keyof typeof BetType],
          betStatus: BetStatus[betStatus as keyof typeof BetStatus],
          potentialWinnings,
          profitOrLoss,
          betOutcome: BetOutcome[betOutcome as keyof typeof BetOutcome],
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
