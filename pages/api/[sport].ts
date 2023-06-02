// pages/api/proxy/[id].ts
import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { id } = req.query;
  const response = await fetch(
    `https://api.the-odds-api.com/v4/sports/${id}/odds/?apiKey=${process.env.ODDS_API_KEY}&regions=us&markets=h2h,spreads&oddsFormat=american`
  );

  if (!response.ok) {
    return res.status(response.status).json({
      message: `Error ${response.status}: ${response.statusText}`,
    });
  }

  const data = await response.json();
  res.status(200).json(data);
}
