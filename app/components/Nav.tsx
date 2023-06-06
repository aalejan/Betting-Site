// components/Nav.tsx

import Link from "next/link";

export default function Nav() {
  const sports = ["mma_mixed_martial_arts", "baseball_mlb", "basketball_nba"];

  return (
    <nav className='pb-4 flex justify-between'>
      {sports.map((sport) => (
        <Link
          key={sport}
          href={{
            pathname: `/sports/${sport}`,
            query: { id: sport },
          }}
        >
          {sport}
        </Link>
      ))}
    </nav>
  );
}
