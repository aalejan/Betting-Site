// pages/sport/[id].tsx
import BettingOddsPage from "./bettingOdds";

export default async function SportsPage({ searchParams }) {
  // const [oddsData, setOddsData] = useState<null | OddsData[]>(null);
  // const [error, setError] = useState<null | string>(null);

  return (
    <>
      <BettingOddsPage {...searchParams} />
    </>
  );
}
