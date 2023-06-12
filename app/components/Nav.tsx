// components/Nav.tsx
"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Nav({ user }: Session) {
  const sports = ["mma_mixed_martial_arts", "baseball_mlb", "basketball_nba"];
  console.log(user?.name);

  return (
    <nav className='flex justify-between items-center py-8'>
      <Link className='' href={"/"}>
        <h1 className='text-2xl font-bold'>Big Bets</h1>
      </Link>
      <ul className='flex items-center gap-12'>
        {sports.map((sport) => (
          <li>
            <Link
              key={sport}
              href={{
                pathname: `/sports/${sport}`,
                query: { id: sport },
              }}
            >
              {sport}
            </Link>
          </li>
        ))}
      </ul>
      <button className='btn-primary rounded-md p-4'>Sign in</button>
    </nav>
  );
}
