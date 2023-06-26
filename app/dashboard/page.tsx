"use client";

import Bet from "../components/Bet";
import useSwr from "swr";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/bets`;

export default function BetsDashboard() {
  const { data: bets, error } = useSwr(API, fetcher);
  console.log(bets);

  return (
    <div className='flex flex-col lg:flex-row xl:flex-row items-center lg:items-start xl:items-start flex-wrap justify-center gap-3'>
      {bets && bets.map((bet) => <Bet bet={bet} />)}
    </div>
  );
}
