// OddComponent.tsx
"use client";
export default function OddComponent({
  odd,
  sportsbooks,
}: {
  odd: OddsData;
  sportsbooks: string[];
}) {
  return (
    <div key={odd.id} className='card bordered bg-neutral p-2'>
      <div className='card-body'>
        <h2 className='card-title'>
          {odd.home_team} vs {odd.away_team}
        </h2>
        {odd.bookmakers.map((book) =>
          sportsbooks.includes(book.title) ? (
            <div key={book.key}>
              <h3 className='font-bold '>{book.title}</h3>
              {book.markets.map((market) => (
                <div key={market.key}>
                  <h4 className='text-sm'>
                    {market.key == "h2h" ? "Moneyline" : "Spread"}
                  </h4>
                  <table className='table-auto w-full text-center border-collapse border border-gray-300 text-sm'>
                    <thead>
                      <tr className='grid grid-cols-3 divide-x divide-gray-300'>
                        <th className='p-1 border-b border-gray-300'>Name</th>
                        <th className='p-1 border-b border-gray-300'>Price</th>
                        <th className='p-1 border-b border-gray-300'>Point</th>
                      </tr>
                    </thead>
                    <tbody>
                      {market.outcomes.map((outcome) => (
                        <tr
                          key={outcome.name}
                          className='grid grid-cols-3 divide-x divide-gray-300'
                        >
                          <td className='p-1 border-b border-gray-300'>
                            {outcome.name}
                          </td>
                          <td className='p-1 border-b border-gray-300 text-black'>
                            <button className='bg-neutral-content btn-sm rounded-md text-sm'>
                              {outcome.price >= 100
                                ? `+${outcome.price}`
                                : outcome.price}
                            </button>
                          </td>
                          <td className='p-1 border-b border-gray-300'>
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
          ) : null
        )}
      </div>
    </div>
  );
}
