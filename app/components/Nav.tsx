// components/Nav.tsx
"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Link from "next/link";

export default function Nav({ user }: Session) {
  const sports = ["mma_mixed_martial_arts", "baseball_mlb", "basketball_nba"];
  const sportKey: { [key: string]: string } = {
    mma_mixed_martial_arts: "MMA",
    baseball_mlb: "MLB",
    basketball_nba: "NBA",
  };

  return (
    <nav className='flex justify-between items-center py-8'>
      <Link className='' href={"/"}>
        <h1 className='text-2xl font-bold'>Big Bets</h1>
      </Link>
      <ul className='flex items-center gap-12 font-semibold'>
        {sports.map((sport) => (
          <li key={sport}>
            <Link
              key={sport}
              href={{
                pathname: `/sports/${sport}`,
                query: { id: sport },
              }}
            >
              {sportKey[sport]}
            </Link>
          </li>
        ))}
      </ul>
      {user && (
        <button
          onClick={() => signOut()}
          className='btn-primary rounded-md p-4'
        >
          Sign out
        </button>
      )}

      {!user && (
        <button onClick={() => signIn()} className='btn-primary rounded-md p-4'>
          Sign in
        </button>
      )}
    </nav>
  );
}
