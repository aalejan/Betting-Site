"use client";
import useSWR from "swr";
import OddComponent from "@/app/components/Odds";
import { useSearchParams } from "next/navigation";

const fetcher = async (url: string) => {
  const response = await fetch(url);
  if (!response.ok) {
    throw new Error(`HTTP error! status: ${response.status}`);
  }
  const data = await response.json();
  return data;
};

export default function BettingOddsPage() {
  const searchParams = useSearchParams();
  const search = searchParams.get("id");

  const { data: oddsData, error } = useSWR(`/api/proxy/${search}`, fetcher);

  const isLoading = !oddsData && !error;

  const sportsbooks = [
    "DraftKings",
    "BetMGM",
    "MyBookie.ag",
    "FanDuel",
    "Barstool Sportsbook",
  ];

  if (isLoading) {
    return <h1>Loading Data</h1>;
  }

  if (error) {
    return <div>Error loading data: {error.message}</div>;
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
