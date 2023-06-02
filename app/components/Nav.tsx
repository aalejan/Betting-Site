// components/Nav.tsx

import Link from "next/link";

export default function Nav() {
  const sports = ["mma_mixed_martial_arts", "soccer_epl"];

  return (
    <nav>
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
