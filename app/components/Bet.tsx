export default function Bet({ bet }) {
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
          Status:{" "}
          <span
            className={`font-semibold ${
              bet.betStatus === "completed" ? "text-accent" : "text-warning"
            }`}
          >
            {bet.betStatus === "in_progress" ? "in progress" : bet.betStatus}
          </span>
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
      </div>
    </div>
  );
}
