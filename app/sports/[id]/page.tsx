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
    <div className='max-w-screen mx-auto px-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-3 gap-4'>
      {oddsData &&
        oddsData.map((odd) => (
          <div key={odd.id} className='card bordered bg-slate-600'>
            <div className='card-body'>
              <h2 className='card-title'>
                {odd.home_team} vs {odd.away_team}
              </h2>
              {odd.bookmakers.map((book) => (
                <div key={book.key}>
                  <h3 className='font-bold text-lg'>{book.title}</h3>
                  {book.markets.map((market) => (
                    <div key={market.key}>
                      <h4 className=''>
                        {market.key == "h2h" ? "Moneyline" : "Spread"}
                      </h4>
                      <table className='table-auto w-full text-center border-collapse border border-gray-300'>
                        <thead>
                          <tr className='grid grid-cols-3 divide-x divide-gray-300'>
                            <th className='p-2 border-b border-gray-300'>
                              Name
                            </th>
                            <th className='p-2 border-b border-gray-300'>
                              Price
                            </th>
                            <th className='p-2 border-b border-gray-300'>
                              Point
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {market.outcomes.map((outcome) => (
                            <tr
                              key={outcome.name}
                              className='grid grid-cols-3 divide-x divide-gray-300'
                            >
                              <td className='p-2 border-b border-gray-300'>
                                {outcome.name}
                              </td>
                              <td className='p-2 border-b border-gray-300'>
                                {outcome.price}
                              </td>
                              <td className='p-2 border-b border-gray-300'>
                                {outcome.point != null
                                  ? `Points: ${outcome.point}`
                                  : "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
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
