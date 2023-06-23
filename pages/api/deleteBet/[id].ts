// pages/api/deleteBet.ts

import { authOptions } from "../auth/[...nextauth]";
import { getServerSession } from "next-auth";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "@/utils/prisma";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("hello");
  // Retrieve user session
  const userSession = await getServerSession(req, res, authOptions);
  // If user is not logged in, return an error
  if (!userSession?.user) {
    return res.status(403).json({ error: "Not logged in" });
  }
  const userId = userSession.user?.id;

  if (req.method === "DELETE") {
    try {
      const { id } = req.query;

      const bet = await prisma.bet.delete({
        where: {
          id: String(id),
        },
      });

      res.json({ message: "Bet deleted successfully", deletedBet: bet });
    } catch (error) {
      res.status(500).json({ error: `Error deleting bet: ${error.message}` });
    }
  } else {
    res.status(405).json({ error: "Method not allowed" });
  }
}
