// pages/sport/[id].tsx

export default async function SportsPage({ searchParams }) {
  // const [oddsData, setOddsData] = useState<null | OddsData[]>(null);
  // const [error, setError] = useState<null | string>(null);
  const id = searchParams.id;
  console.log(id);
  const fetchData = async () => {
    console.log(id);
    if (id) {
      try {
        const response = await fetch(`${process.env.DEV_URL}/api/proxy/${id}`);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const data = await response.json();
        return data;
      } catch (error) {
        console.log(error);
      }
    }
  };

  const oddsData: OddsData[] = await fetchData();

  // render your oddsData here

  return (
    <div className='max-w-screen mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
      {oddsData &&
        oddsData.map((odd) => (
          <div key={odd.id} className='card bordered bg-slate-600'>
            <div className='card-body'>
              <h2 className='card-title'>
                {odd.home_team} vs {odd.away_team}
              </h2>
              {odd.bookmakers.map((book) => (
                <div key={book.key}>
                  <h3 className='font-bold'>{book.title}</h3>
                  {book.markets.map((market) => (
                    <div key={market.key}>
                      <h4 className=''>{market.key}</h4>
                      <div className='flex overflow-auto gap-4 lg:gap-2'>
                        {market.outcomes.map((outcome) => (
                          <>
                            <div
                              key={outcome.name}
                              className='grid grid-rows-2'
                            >
                              <p className='text-base'>{outcome.name}</p>
                              <p className='text-base '>{outcome.price}</p>
                              {outcome.point != null ? (
                                <p className='text-base'>
                                  {outcome.point &&
                                    `  Points: ${outcome.point}`}
                                </p>
                              ) : (
                                ""
                              )}
                            </div>
                          </>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        ))}
    </div>
  );
}
