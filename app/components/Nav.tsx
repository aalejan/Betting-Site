// components/Nav.tsx
"use client";
import { Session } from "next-auth";
import { signIn, signOut } from "next-auth/react";
import Image from "next/image";
import Link from "next/link";

export default function Nav({ user }: Session) {
  const sports = [
    "mma_mixed_martial_arts",
    "baseball_mlb",
    "basketball_nba",
    "soccer_usa_mls",
  ];
  const sportKey: { [key: string]: string } = {
    mma_mixed_martial_arts: "MMA",
    baseball_mlb: "MLB",
    basketball_nba: "NBA",
    soccer_usa_mls: "MLS",
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
        <div className='dropdown dropdown-end'>
          <label tabIndex={0} className='btn btn-ghost btn-circle avatar'>
            <div className='w-10 rounded-full'>
              <Image
                src={user?.image as string}
                alt={user.name as string}
                width={36}
                height={36}
                className='rounded-full'
                tabIndex={0}
              />
            </div>
          </label>
          <ul
            tabIndex={0}
            className='mt-3 p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52 font-semibold'
          >
            <li>
              <Link href={"/dashboard"}>Dashboard</Link>
            </li>
            <li>
              <a onClick={() => signOut()}>Logout</a>
            </li>
          </ul>
        </div>
      )}

      {!user && (
        <button onClick={() => signIn()} className='btn-primary rounded-md p-4'>
          Sign in
        </button>
      )}
    </nav>
  );
}
