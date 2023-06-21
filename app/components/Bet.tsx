"use client";

import { Bet } from "@prisma/client";
import { Input } from "postcss";
import { useState } from "react";

export default function Bet({ bet }: { bet: Bet }) {
  const [editing, setEditing] = useState(false);
  const [potentialWinnings, setPotentialWinnings] = useState(
    bet.potentialWinnings
  );
  const [profitOrLoss, setProfitOrLoss] = useState(bet.profitOrLoss);

  const [tempPotentialWinnings, setTempPotentialWinnings] =
    useState(potentialWinnings);
  const [tempProfitOrLoss, setTempProfitOrLoss] = useState(profitOrLoss);

  const saveBet = async () => {
    const response = await fetch("/api/updateBet", {
      method: "PUT",
      body: JSON.stringify({
        id: bet.id,
        potentialWinnings: parseFloat(potentialWinnings),
        profitOrLoss: parseFloat(profitOrLoss),
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();
    console.log(data);
    if (response.ok) {
      setEditing(false);
      // Update state with temporary values
      setPotentialWinnings(tempPotentialWinnings);
      setProfitOrLoss(tempProfitOrLoss);
    } else {
      console.error("Error saving bet:", data);
    }
  };
  return (
    <div key={bet.id} className='card bg-neutral bordered'>
      <div className='card-body'>
        <h2 className='card-title'>
          {bet.teamBetOn} vs {bet.teamBetAgainst}
        </h2>
        <p>
          Amount: <span className='font-semibold'>{bet.amount}</span>
        </p>
        <p>
          Type: <span className='font-semibold'>{bet.type}</span>
        </p>
        <p>
          Odds Taken: <span className='font-semibold'>{bet.oddsTaken}</span>
        </p>
        <p>
          Amount: <span className='font-semibold'>{bet.amount}</span>
        </p>
        {bet.betStatus === "in_progress" && (
          <p>
            Potential winnings:{" "}
            {!editing ? (
              <span className='font-semibold'>{potentialWinnings}</span>
            ) : (
              <input
                type='number'
                value={tempPotentialWinnings}
                onChange={(e) => setTempPotentialWinnings(e.target.value)}
              />
            )}
          </p>
        )}
        {bet.betStatus === "completed" && (
          <p>
            Profit/Loss:{" "}
            {!editing ? (
              <span className='font-semibold'>{profitOrLoss}</span>
            ) : (
              <input
                type='number'
                value={tempProfitOrLoss}
                onChange={(e) => setTempProfitOrLoss(e.target.value)}
              />
            )}
          </p>
        )}
        <p>
          Status:{" "}
          <span
            className={`font-semibold ${
              bet.betStatus === "completed" ? "text-accent" : "text-warning"
            }`}
          >
            {bet.betStatus === "in_progress" ? "in progress" : bet.betStatus}
          </span>
        </p>
        {bet.betStatus === "completed" && (
          <p>
            Bet outcome: <span className='font-semibold'>{bet.betOutcome}</span>
          </p>
        )}
        <p>
          Type: <span className='font-semibold'>{bet.type}</span>
        </p>
        <p>
          Created At:{" "}
          <span className='font-semibold'>
            {new Date(bet.createdAt).toLocaleString()}
          </span>
        </p>
        <p>
          Updated At:{" "}
          <span className='font-semibold'>
            {new Date(bet.updatedAt).toLocaleString()}
          </span>
        </p>
        {!editing ? (
          <button
            className='btn-primary rounded-md p-2 font-semibold'
            onClick={() => setEditing(true)}
          >
            Edit bet
          </button>
        ) : (
          <button
            onClick={saveBet}
            className='btn-primary rounded-md p-2 font-semibold'
          >
            Save bet
          </button>
        )}

        {editing && (
          <button
            className='btn-ghost p-2 mt-1 rounded-md'
            onClick={() => setEditing(false)}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
