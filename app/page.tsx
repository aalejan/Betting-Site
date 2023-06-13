import { Mandali } from "next/font/google";
import Image from "next/image";
import BetForm from "./components/BetForm";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

export default async function Home() {
  const session = await getServerSession(authOptions);

  return (
    <main>
      <BetForm user={session?.user} expires={session?.expires as string} />
    </main>
  );
}
