// pages/api/bets.ts

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

  if (req.method === "PUT") {
    const { id, profitOrLoss, potentialWinnings, betOutcome, betStatus } =
      req.body;

    // Validation can be added here to ensure that all required fields are filled out

    try {
      const updateData: any = { updatedAt: new Date() }; // Create an empty object to store the updated fields

      // If profitOrLoss and potentialWinnings are provided in the request body, add them to the updateData object
      if (profitOrLoss !== undefined) {
        updateData.profitOrLoss = profitOrLoss;
      }
      if (potentialWinnings !== undefined) {
        updateData.potentialWinnings = potentialWinnings;
      }
      if (betOutcome !== undefined) {
        updateData.betOutcome = betOutcome;
      }
      if (betStatus !== undefined) {
        updateData.betStatus = betStatus;
      }

      const bet = await prisma.bet.update({
        where: {
          id: id,
        },
        data: updateData,
      });

      res.json(bet);
    } catch (error) {
      res.status(500).json({ error: `Error creating bet: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
