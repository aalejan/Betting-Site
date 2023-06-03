// pages/api/proxy/[id].ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const { sport } = req.query;

  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/${sport}/odds/?apiKey=${process.env.NEXT_PUBLIC_ODDS_API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american`
  );

  if (!response.ok) {
    return res.status(response.status).json({
      message: `Error ${response.status}: ${response.statusText}`,
    });
  }

  const data = await response.json();
  console.log(data);
  res.status(200).json(data);
}
