"use client";

import { Bet, BetOutcome, BetStatus } from "@prisma/client";
import { BsTrash3Fill } from "react-icons/bs";
import { useState } from "react";
import { mutate } from "swr";

export default function Bet({ bet }: { bet: Bet }) {
  const [editing, setEditing] = useState(false);

  const [tempBetState, setTempBetState] = useState({
    potentialWinnings: bet.potentialWinnings,
    profitOrLoss: bet.profitOrLoss,
    betOutcome: bet.betOutcome,
    betStatus: bet.betStatus,
  });

  const saveBet = async () => {
    const response = await fetch("/api/updateBet", {
      method: "PUT",
      body: JSON.stringify({
        id: bet.id,
        ...tempBetState,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const data = await response.json();

    if (response.ok) {
      setEditing(false);
      mutate("/api/bets");
    } else {
      console.error("Error saving bet:", data);
    }
  };

  const deleteBet = async () => {
    try {
      const response = await fetch(`/api/deleteBet/${bet.id}`, {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await response.json();

      if (response.ok) {
        console.log("Bet deleted:");
        mutate("/api/bets");
      } else {
        console.error("Error deleting bet:");
      }
    } catch (error) {
      console.log("Error:", error);
    }
  };

  return (
    <div key={bet.id} className='card bg-neutral bordered'>
      <div className='card-body'>
        <p className='flex justify-end'>
          <button onClick={deleteBet}>
            <BsTrash3Fill />
          </button>
        </p>
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
              <span className='font-semibold'>{bet.potentialWinnings}</span>
            ) : (
              <input
                type='number'
                value={tempBetState.potentialWinnings}
                onChange={(e) =>
                  setTempBetState((prevState) => ({
                    ...prevState,
                    potentialWinnings: parseFloat(e.target.value),
                  }))
                }
              />
            )}
          </p>
        )}
        {editing &&
          tempBetState.betStatus === "in_progress" &&
          bet.betStatus != "in_progress" && (
            <p>
              Potential winnings: {""}
              <input
                type='number'
                value={tempBetState.potentialWinnings}
                onChange={(e) =>
                  setTempBetState((prevState) => ({
                    ...prevState,
                    potentialWinnings: parseFloat(e.target.value),
                  }))
                }
              />
            </p>
          )}

        {bet.betStatus === "completed" && (
          <p>
            Profit/Loss:{" "}
            {!editing ? (
              <span className='font-semibold'>{bet.profitOrLoss}</span>
            ) : (
              <input
                type='number'
                value={tempBetState.profitOrLoss}
                onChange={(e) =>
                  setTempBetState((prevState) => ({
                    ...prevState,
                    profitOrLoss: parseFloat(e.target.value),
                  }))
                }
              />
            )}
          </p>
        )}
        {editing &&
          tempBetState.betStatus === "completed" &&
          bet.betStatus != "completed" && (
            <p>
              Profit/Loss: {""}
              <input
                type='number'
                value={tempBetState.profitOrLoss}
                onChange={(e) =>
                  setTempBetState((prevState) => ({
                    ...prevState,
                    profitOrLoss: parseFloat(e.target.value),
                  }))
                }
              />
            </p>
          )}
        <p>
          Status:{" "}
          {!editing ? (
            <span
              className={`font-semibold ${
                bet.betStatus === "completed" ? "text-accent" : "text-warning"
              }`}
            >
              {bet.betStatus === "in_progress" ? "in progress" : bet.betStatus}
            </span>
          ) : (
            <select
              required
              onChange={(e) => {
                setTempBetState((prevState) => ({
                  ...prevState,
                  betStatus: e.target.value as BetStatus,
                }));
              }}
            >
              <option value=''>Choose a status</option>
              <option value='completed'>completed</option>
              <option value='in_progress'>in progress</option>
            </select>
          )}
        </p>
        {bet.betStatus === "completed" && (
          <p>
            {!editing && (
              <>
                Bet outcome: {""}
                <span className='font-semibold'>{bet.betOutcome}</span>
              </>
            )}
            {editing && tempBetState.betStatus === "completed" && (
              <>
                Bet outcome: {""}
                <select
                  required
                  onChange={(e) =>
                    setTempBetState((prevState) => ({
                      ...prevState,
                      betOutcome: e.target.value as BetOutcome,
                    }))
                  }
                >
                  <option value=''>Choose an outcome</option>
                  <option value='win'>win</option>
                  <option value='loss'>loss</option>
                </select>
              </>
            )}
          </p>
        )}

        {editing &&
          tempBetState.betStatus === "completed" &&
          bet.betStatus != "completed" && (
            <p>
              Profit/Loss: {""}
              <select
                required
                onChange={(e) =>
                  setTempBetState((prevState) => ({
                    ...prevState,
                    betOutcome: e.target.value as BetOutcome,
                  }))
                }
              >
                <option value=''>Choose an outcome</option>
                <option value='win'>win</option>
                <option value='loss'>loss</option>
              </select>
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
            onClick={() => {
              setEditing(false);
              setTempBetState({
                potentialWinnings: bet.potentialWinnings,
                profitOrLoss: bet.profitOrLoss,
                betOutcome: bet.betOutcome,
                betStatus: bet.betStatus,
              });
            }}
          >
            Cancel
          </button>
        )}
      </div>
    </div>
  );
}
