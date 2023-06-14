"use client";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState } from "react";

export default function BetForm() {
  const router = useRouter();

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();

    const data = {
      teamBetOn: (event.target as HTMLFormElement)["teamBetOn"].value,
      teamBetAgainst: (event.target as HTMLFormElement)["teamBetAgainst"].value,
      amount: parseFloat((event.target as HTMLFormElement)["amount"].value),
      oddsTaken: parseFloat(
        (event.target as HTMLFormElement)["oddsTaken"].value
      ),
      type: (event.target as HTMLFormElement)["type"].value,
      betStatus: (event.target as HTMLFormElement)["status"].value,
    };

    console.log(data);

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
    console.log(response);
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
        <h2 className='text-2xl mb-4 text-white'>Track your Bet</h2>

        <div className='mb-4'>
          <label htmlFor='teamBetOn' className='block text-white'>
            Team Bet On
          </label>
          <input
            type='text'
            id='teamBetOn'
            name='teamBetOn'
            required
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
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='oddsTaken' className='block text-white'>
            Odds
          </label>
          <input
            id='oddsTaken'
            name='oddsTaken'
            type='number'
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
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label htmlFor='status' className='block text-white'>
            Bet Status
          </label>
          <select
            id='status'
            name='status'
            required
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          >
            <option value='in_progress'>In progress</option>
            <option value='completed'>Completed</option>
          </select>
        </div>
        <div className='mb-4'>
          <label htmlFor='type' className='block text-white'>
            Type
          </label>
          <select
            id='type'
            name='type'
            required
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
          Save Bet
        </button>
      </form>
    </div>
  );
}
