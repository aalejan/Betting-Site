// pages/sport/[id].tsx

import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface OddsData {
  // Define your data structure here
}

export default async function SportsPage({ searchParams }) {
  const [oddsData, setOddsData] = useState(null);
  const [error, setError] = useState(null);
  console.log(searchParams.id);
  const fetchData = async () => {
    if (searchParams.id) {
      try {
        const response = await fetch(
          `https://api.the-odds-api.com/v4/sports/${searchParams.id}/odds/?apiKey=${process.env.NEXT_PUBLIC_ODDS_API_KEY}&regions=us&markets=h2h`
        );
        console.log(response);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data: any = await response.json();
        setOddsData(data);
      } catch (error) {
        console.log(error);
      }
    }
  };
  console.log(searchParams.id);
  console.log("hello");

  fetchData();

  // render your oddsData here
  return <div>{}</div>;
}
