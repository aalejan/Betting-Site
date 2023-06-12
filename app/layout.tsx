import Nav from "./components/Nav";
import "./globals.css";
import { Inter } from "next/font/google";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../pages/api/auth/[...nextauth]";

const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  //gets signed in user
  const session = await getServerSession(authOptions);
  return (
    <html lang='en' data-theme='dark'>
      <body className='mx-4 lg:mx-44 '>
        <Nav user={session?.user} expires={session?.expires as string} />
        {children}
      </body>
    </html>
  );
}
