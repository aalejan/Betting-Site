"use client";

import BetComponent from "../components/BetComponent";
import { useEffect, useState } from "react";
import useSwr from "swr";
import { Bet } from "@prisma/client";

const fetcher = (url) => fetch(url).then((res) => res.json());
const API = `/api/bets`;

export default function BetsDashboard() {
  const { data: bets, error } = useSwr(API, fetcher);
  const [filteredBets, setFilteredBets] = useState<Bet[]>([]);

  useEffect(() => {
    if (bets) {
      setFilteredBets(bets);
    }
  }, [bets]);

  const filterBets = (filterType) => {
    let newFilteredBets;

    switch (filterType) {
      case "won":
        newFilteredBets = bets?.filter((bet) => bet.betOutcome === "win");
        break;
      case "loss":
        newFilteredBets = bets?.filter((bet) => bet.betOutcome === "loss");
        break;
      case "in_progress":
        newFilteredBets = bets?.filter(
          (bet) => bet.betStatus === "in_progress"
        );
        break;
      default:
        newFilteredBets = bets;
    }

    setFilteredBets(newFilteredBets);
  };

  if (error) return <div>Error loading bets</div>;
  if (!filteredBets) return <div>Loading...</div>;

  return (
    <>
      <div className='flex justify-around p-2'>
        <button
          className='btn-primary rounded-md p-2'
          onClick={() => filterBets("win")}
        >
          Won
        </button>
        <button
          className='btn-primary rounded-md p-2'
          onClick={() => filterBets("loss")}
        >
          Lost
        </button>
        <button
          className='btn-primary rounded-md p-2'
          onClick={() => filterBets("in_progress")}
        >
          In Progress
        </button>
        <button
          className='btn-primary rounded-md p-2'
          onClick={() => setFilteredBets(bets)}
        >
          All
        </button>
      </div>

      <div className='flex flex-col lg:flex-row xl:flex-row items-center lg:items-start xl:items-start flex-wrap justify-center gap-3'>
        {filteredBets.map((bet) => (
          <BetComponent key={bet.id} bet={bet} />
        ))}
      </div>
    </>
  );
}
