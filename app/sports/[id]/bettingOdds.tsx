"use client";

import OddComponent from "@/app/components/Odds";
import { useEffect, useState } from "react";

const fetchData = async (id: string) => {
  if (id) {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/proxy/${id}`
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log(data);
      return data;
    } catch (error) {
      console.log(error);

      return null;
    }
  }
};

export default function BettingOddsPage({ id }) {
  const [oddsData, setData] = useState([]);
  const [isLoading, setLoading] = useState(false);
  const sportsbooks = [
    "DraftKings",
    "BetMGM",
    "MyBookie.ag",
    "FanDuel",
    "Barstool Sportsbook",
  ];

  useEffect(() => {
    setLoading(true);
    fetch(`/api/proxy/${id}`)
      .then((res) => res.json())
      .then((data) => {
        setData(data);
        setLoading(false);
      });
  }, [id]);

  if (isLoading) {
    return <h1>Loading Data</h1>;
  }

  return (
    <div className='max-w-screen mx-auto px-4 grid grid-cols-1 sm:grid-cols-1md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 text-white'>
      {oddsData &&
        oddsData.map((odd) => (
          <OddComponent odd={odd} sportsbooks={sportsbooks} />
        ))}
    </div>
  );
}
