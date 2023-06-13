import { Mandali } from "next/font/google";
import Image from "next/image";
import BetForm from "./components/BetForm";

export default async function Home() {
  return (
    <main>
      <BetForm />
    </main>
  );
}
