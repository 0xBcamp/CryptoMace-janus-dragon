
import { Navbar } from "../components/navbar";
import "./globals.css";
import GamePage from "@/components/game-page";


export default function Home() {
  return (
    <>

      <main className="flex min-h-screen flex-col items-center justify-between pt-3 bg-[url('../../public/bgMatrix.png')] bg-cover">
        <Navbar />

        <GamePage />
      </main>
    </>
  );
}
