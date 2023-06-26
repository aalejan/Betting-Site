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

  if (req.method === "GET") {
    try {
      const bets = await prisma.bet.findMany({
        where: { userId: userId },
      });

      res.json(bets);
      console.log(bets);
    } catch (error) {
      res.status(500).json({ error: `Error fetching bets: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
