import Image from "next/image";
import { Inter } from "next/font/google";
import { Main } from "./_components/Main";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <main
      className={`flex min-h-screen flex-col items-center p-24 bg-gray-200 ${inter.className}`}
    >
      <h1 className="text-4xl font-bold text-center text-gray-800">
        Spec LogTime Viewer
      </h1>
      <Main />
    </main>
  );
}
