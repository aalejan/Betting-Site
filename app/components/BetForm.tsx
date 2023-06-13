"use client";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

export default function BetForm({ user }: Session) {
  const [userId, setUserId] = useState("");
  const [teamBetOn, setTeamBetOn] = useState("");
  const [teamBetAgainst, setTeamBetAgainst] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");
  const router = useRouter();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      userId: initialUserId,
      teamBetOn: event.target.teamBetOn.value,
      teamBetAgainst: event.target.teamBetAgainst.value,
      amount: parseFloat(event.target.amount.value),
      type: event.target.type.value,
    };

    const JSONdata = JSON.stringify(data);

    const endpoint = "/api/betCreation";

    const options = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSONdata,
    };

    const response = await fetch(endpoint, options);

    if (response.status === 403) {
      return router.push("/api/auth/signin");
    }

    if (response.ok) {
      alert("Bet placed successfully!");
    } else {
      throw new Error("An error occurred while placing the bet.");
    }
  };

  return (
    <div className='  text-white min-h-screen'>
      <form
        onSubmit={submitForm}
        className='bg-neutral p-6 rounded-lg shadow-lg max-w-md lg:max-w-lg xl:max-w-xl mx-auto'
      >
        <h2 className='text-2xl mb-4 text-white'>Place your Bet</h2>

        <div className='mb-4'>
          <label htmlFor='teamBetOn' className='block text-white'>
            Team Bet On
          </label>
          <input
            type='text'
            id='teamBetOn'
            name='teamBetOn'
            required
            value={teamBetOn}
            onChange={(e) => setTeamBetOn(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='teamBetAgainst' className='block text-white'>
            Team Bet Against
          </label>
          <input
            type='text'
            id='teamBetAgainst'
            name='teamBetAgainst'
            required
            value={teamBetAgainst}
            onChange={(e) => setTeamBetAgainst(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='amount' className='block text-white'>
            Amount
          </label>
          <input
            id='amount'
            name='amount'
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='type' className='block text-white'>
            Type
          </label>
          <select
            id='type'
            name='type'
            required
            value={type}
            onChange={(e) => setType(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          >
            <option value='h2h'>Head-to-Head</option>
            <option value='spread'>Spread</option>
          </select>
        </div>
        <button
          type='submit'
          className='w-full px-4 py-2 rounded-lg bg-primary text-white'
        >
          Place Bet
        </button>
      </form>
    </div>
  );
}
