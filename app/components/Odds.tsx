"use client";
import { useState, useEffect } from "react";
export default function OddComponent({
  odd,
  sportsbooks,
}: {
  odd: OddsData;
  sportsbooks: string[];
}) {
  const [isMounted, setIsMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false); // manage the dropdown state

  const toggleOpen = () => setIsOpen(!isOpen); // function to toggle the dropdown
  useEffect(() => {
    setIsMounted(true);
  }, []);
  return (
    <>
      {isMounted && (
        <div key={odd.id} className='card'>
          <div className='card-body'>
            <div className='collapse collapse-arrow' onClick={toggleOpen}>
              <input type='checkbox' checked={isOpen} />
              <p className='collapse-title'>
                <h2 className='card-title bg-primary rounded-lg p-3'>
                  {odd.home_team} vs {odd.away_team}
                </h2>
              </p>
              <div className='collapse-content'>
                {odd.bookmakers.map((book) =>
                  sportsbooks.includes(book.title) ? (
                    <div
                      className='bg-neutral rounded-md p-4 mb-1'
                      key={book.key}
                    >
                      <h3 className='font-bold '>{book.title}</h3>
                      {book.markets.map((market) => (
                        <div key={market.key}>
                          <h4 className='text-sm'>
                            {market.key == "h2h" ? "Moneyline" : "Spread"}
                          </h4>
                          <table className='table-auto w-full text-center border-collapse border border-gray-300 text-sm'>
                            <thead>
                              <tr className='grid grid-cols-3 divide-x divide-gray-300'>
                                <th className='p-1 border-b border-gray-300'>
                                  Name
                                </th>
                                <th className='p-1 border-b border-gray-300'>
                                  Price
                                </th>
                                <th className='p-1 border-b border-gray-300'>
                                  Point
                                </th>
                              </tr>
                            </thead>
                            <tbody>
                              {market.outcomes.map((outcome) => (
                                <tr
                                  key={outcome.name}
                                  className='grid grid-cols-3 divide-x divide-gray-300 text-xs'
                                >
                                  <td className='p-1 border-b border-gray-300 font-bold'>
                                    {outcome.name}
                                  </td>
                                  <td className='p-1 border-b border-gray-300 text-success'>
                                    <button className=' btn-sm rounded-md text-xs bg-slate-600 font-semibold'>
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
          </div>
        </div>
      )}
    </>
  );
}
