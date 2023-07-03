// pages/sport/[id].tsx
import OddComponent from "../../components/Odds";

const fetchData = async (id: string) => {
  console.log(id);
  if (id) {
    try {
      const response = await fetch(
        `${process.env.NEXTAUTH_URL}/api/proxy/${id}`,
        {
          next: { revalidate: 0 },
        }
      );

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      return data;
    } catch (error) {
      console.log(error);
      return null;
    }
  }
};
export default async function SportsPage({ searchParams }) {
  // const [oddsData, setOddsData] = useState<null | OddsData[]>(null);
  // const [error, setError] = useState<null | string>(null);
  const id = searchParams.id;
  const sportsbooks = [
    "DraftKings",
    "BetMGM",
    "MyBookie.ag",
    "FanDuel",
    "Barstool Sportsbook",
  ];

  const oddsData: OddsData[] = await fetchData(id);

  // render your oddsData here

  return (
    <div className='max-w-screen mx-auto px-4 grid grid-cols-1 sm:grid-cols-1md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-3 text-white'>
      {oddsData &&
        oddsData.map((odd) => (
          <OddComponent odd={odd} sportsbooks={sportsbooks} />
        ))}
    </div>
  );
}
