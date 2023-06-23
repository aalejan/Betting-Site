import { PrismaClient } from "@prisma/client";
import { authOptions } from "../../pages/api/auth/[...nextauth]";
import { getServerSession } from "next-auth";
import { prisma } from "../../utils/prisma";
import Bet from "../components/Bet";

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

  return (
    <div className='flex flex-col lg:flex-row xl:flex-row items-center lg:items-start xl:items-start flex-wrap justify-center gap-3'>
      {userBets && userBets.map((bet) => <Bet bet={bet} />)}
    </div>
  );
}
