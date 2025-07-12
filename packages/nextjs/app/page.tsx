"use client";

import Link from "next/link";
import type { NextPage } from "next";
import { useAccount } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

const Home: NextPage = () => {
  const { address: connectedAddress } = useAccount();

  return (
    <div className="flex flex-col items-center grow pt-10 bg-gray-50 min-h-screen text-gray-800">
      <header className="w-full border-b bg-white px-6 py-4 shadow-sm">
        <h1 className="text-3xl font-semibold text-center text-blue-800">Hsk Swap</h1>
      </header>

      <main className="w-full max-w-4xl px-6 py-12">
        <section className="mb-8 text-center">
          <p className="text-lg mb-2 font-medium">Connected Wallet:</p>
          <Address address={connectedAddress} />
        </section>

        <section className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Swap Form */}
          <div className="bg-white p-6 shadow rounded border">
            <h2 className="text-xl font-semibold mb-4 text-blue-700">Swap Tokens</h2>

            <input
              type="number"
              placeholder="Amount"
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded mb-2">
              Swap A ➝ B
            </button>

            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded">
              Approve Token A
            </button>
          </div>

          {/* Debug or Info Box */}
          <div className="bg-white p-6 shadow rounded border">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Herramientas</h2>
            <ul className="list-disc list-inside text-gray-600 text-sm">
              <li>
                <Link href="/debug" className="text-blue-600 hover:underline">
                  Debug Contracts
                </Link>
              </li>
              <li>
                <Link href="/blockexplorer" className="text-blue-600 hover:underline">
                  Block Explorer
                </Link>
              </li>
            </ul>
          </div>
        </section>
      </main>
    </div>
  );
};

export default Home;
