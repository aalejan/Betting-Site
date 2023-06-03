// pages/sport/[id].tsx
"use client";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

interface OddsData {
  // Define your data structure here
}

export default function SportsPage({ searchParams }) {
  const [oddsData, setOddsData] = useState<null | OddsData>(null);
  const [error, setError] = useState<null | string>(null);
  const id = searchParams.id;

  useEffect(() => {
    const fetchData = async () => {
      if (id) {
        try {
          const response = await fetch(`/api/proxy/${id}`);

          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }

          const data: OddsData = await response.json();
          console.log(data);
          setOddsData(data);
        } catch (error) {
          setError(error.message);
        }
      }
    };

    fetchData();
  }, [id]);

  // render your oddsData here
  return <div>{/* Render your data here */}</div>;
}
