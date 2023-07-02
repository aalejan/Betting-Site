"use client";
import { useRouter } from "next/navigation";
import { Session } from "next-auth";
import { useState, useRef } from "react";
import Link from "next/link";

export default function BetForm() {
  const router = useRouter();
  const [status, setStatus] = useState("");
  const [showModal, setShowModal] = useState(false);
  const dialogRef = useRef<HTMLDialogElement>(null);

  const submitForm = async (event: React.FormEvent) => {
    event.preventDefault();
    const resetForm = () => {
      const form = event.target as HTMLFormElement;
      form.reset();
      setStatus("");
    };
    const data = {
      teamBetOn: (event.target as HTMLFormElement)["teamBetOn"].value,
      teamBetAgainst: (event.target as HTMLFormElement)["teamBetAgainst"].value,
      amount: parseFloat((event.target as HTMLFormElement)["amount"].value),
      oddsTaken: parseFloat(
        (event.target as HTMLFormElement)["oddsTaken"].value
      ),
      type: (event.target as HTMLFormElement)["type"].value,
      betStatus: (event.target as HTMLFormElement)["status"].value,
      profitOrLoss: (event.target as HTMLFormElement)["profitOrLoss"]?.value
        ? parseFloat((event.target as HTMLFormElement)["profitOrLoss"].value)
        : null,

      potentialWinnings: (event.target as HTMLFormElement)["potentialWinnings"]
        ?.value
        ? parseFloat(
            (event.target as HTMLFormElement)["potentialWinnings"]?.value
          )
        : null,
      betOutcome: (event.target as HTMLFormElement)["betOutcome"]?.value, // Add this line
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
      setTimeout(() => {
        if (dialogRef.current) {
          dialogRef.current.showModal();
        }
        resetForm();
      }, 300);
    } else {
      const errorData = await response.json();
      throw new Error(
        `An error occurred while placing the bet: ${
          response.status
        }, ${JSON.stringify(errorData)}`
      );
    }
  };

  return (
    <div className='  text-white min-h-screen'>
      <dialog ref={dialogRef} id='my_modal_2' className='modal'>
        <form method='dialog' className='modal-box'>
          <h3 className='font-bold text-lg'>Bet placed successfully!</h3>
          <p className='py-4'>See all bets in your Dashboard.</p>
          <Link className='btn-primary rounded-md p-2' href={"/dashboard"}>
            Dashboard
          </Link>
        </form>

        <form method='dialog' className='modal-backdrop'>
          <button>close</button>
        </form>
      </dialog>
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
            type='text'
            required
            pattern='-?\d+(\.\d+)?'
            title='Please enter a valid number'
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
            type='text'
            pattern='[0-9]+(\.[0-9]+)?'
            required
            title='Please enter a valid number or decimal'
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          />
        </div>
        {status === "in_progress" && (
          <div className='mb-4'>
            <label htmlFor='potentialWinnings' className='block text-white'>
              Potential winnings
            </label>
            <input
              id='potentialWinnings'
              name='potentialWinnings'
              type='potentialWinnings'
              required
              className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
            />
          </div>
        )}
        {status === "completed" && (
          <div className='mb-4'>
            <label htmlFor='profitOrLoss' className='block text-white'>
              Profit/Loss
            </label>
            <input
              id='profitOrLoss'
              name='profitOrLoss'
              type='profitOrLoss'
              required
              pattern='-?\d+(\.\d+)?'
              title='Please enter a valid number or decimal'
              placeholder='If loss, please enter a negative number'
              className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
            />
          </div>
        )}

        <div className='mb-4'>
          <label htmlFor='status' className='block text-white'>
            Bet Status
          </label>
          <select
            id='status'
            name='status'
            required
            onChange={(e) => setStatus(e.target.value)}
            className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
          >
            <option value=''>Choose a status</option>
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
        {status === "completed" && (
          <div className='mb-4'>
            <label htmlFor='betOutcome' className='block text-white'>
              Bet outcome
            </label>
            <select
              id='betOutcome'
              name='betOutcome'
              required
              className='mt-1 w-full px-4 py-2 rounded-lg bg-gray-800 text-white'
            >
              <option value=''>Choose an outcome</option>
              <option value='win'>Won</option>
              <option value='loss'>Loss</option>
            </select>
          </div>
        )}

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
