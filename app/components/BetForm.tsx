"use client";
import { useState } from "react";

function BetForm() {
  const [userId, setUserId] = useState("");
  const [teamBetOn, setTeamBetOn] = useState("");
  const [teamBetAgainst, setTeamBetAgainst] = useState("");
  const [amount, setAmount] = useState("");
  const [type, setType] = useState("");

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    // This is where we'll handle the form submission
  };

  return (
    <div className='  text-white min-h-screen'>
      <form
        onSubmit={submitForm}
        className='bg-neutral p-6 rounded-lg shadow-lg max-w-md lg:max-w-lg xl:max-w-xl mx-auto'
      >
        <h2 className='text-2xl mb-4 text-white'>Place your Bet</h2>
        <div className='mb-4'>
          <label className='block text-white'>User ID</label>
          <input
            type='text'
            value={userId}
            onChange={(e) => setUserId(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white'>Team Bet On</label>
          <input
            type='text'
            value={teamBetOn}
            onChange={(e) => setTeamBetOn(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white'>Team Bet Against</label>
          <input
            type='text'
            value={teamBetAgainst}
            onChange={(e) => setTeamBetAgainst(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white'>Amount</label>
          <input
            type='number'
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        <div className='mb-4'>
          <label className='block text-white'>Type</label>
          <select
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

export default BetForm;
