import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { prisma } from "../../utils/prisma";

const fetchBets = async () => {
  const user = await getServerSession(authOptions);
  if (!user) {
    return null;
  }
  const bets = await prisma.bet.findMany({
    where: { userId: user?.user?.id },
  });
  return bets;
};

export default async function BetsDashboard() {
  const userBets = await fetchBets();
  console.log(userBets);
  return (
    <div className='flex flex-col lg:flex-row xl:flex-row items-center flex-wrap justify-center gap-3'>
      {userBets &&
        userBets.map((bet) => (
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
                Odds Taken:{" "}
                <span className='font-semibold'>{bet.oddsTaken}</span>
              </p>
              <p>
                Status:{" "}
                <span
                  className={`font-semibold ${
                    bet.betStatus === "completed"
                      ? "text-accent"
                      : "text-warning"
                  }`}
                >
                  {bet.betStatus === "in_progress"
                    ? "in progress"
                    : bet.betStatus}
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
        ))}
    </div>
  );
}
