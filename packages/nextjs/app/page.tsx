"use client";

import { useState } from "react";
import Link from "next/link";
import SimpleSwapJson from "../abis/SimpleSwap.json";
import type { NextPage } from "next";
import { parseEther } from "viem";
import { useAccount, useReadContract, useWaitForTransactionReceipt, useWriteContract } from "wagmi";
import { Address } from "~~/components/scaffold-eth";

// Addresses
const tokenAAddress = "0x617E43FCAadEc63172574F7A51836B2De0927e6d";
const tokenBAddress = "0xa222430736e5c77De41Ce322eA3A63221cb9ee2e";
const contractAddress = "0xED79BbAFED4fb2D0cfF8E26A442faDC75471FC09";

const Home: NextPage = () => {
  const { address: connectedAddress, chain } = useAccount();
  const contractAbi = SimpleSwapJson.abi;

  const [amountIn, setAmountIn] = useState("");
  const [txDetails, setTxDetails] = useState<{
    hash: `0x${string}`;
    amountA: string;
    amountB: string;
  } | null>(null);
  const [showModal, setShowModal] = useState(false);
  const [txHash, setTxHash] = useState<`0x${string}` | undefined>(undefined);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { data: price } = useReadContract({
    address: contractAddress,
    abi: contractAbi,
    functionName: "getPrice",
    args: [tokenAAddress, tokenBAddress],
  });

  const { writeContractAsync } = useWriteContract();

  const { data: receipt } = useWaitForTransactionReceipt({
    hash: txHash,
    chainId: chain?.id,
    confirmations: 1,
    query: {
      enabled: !!txHash,
    },
  });

  const handleSwap = async () => {
    if (!connectedAddress || !amountIn) return;

    const deadline = Math.floor(Date.now() / 1000) + 60 * 20;
    const calculatedAmountB = price ? (parseFloat(price.toString()) * parseFloat(amountIn)).toFixed(4) : "0";

    setIsSubmitting(true);
    try {
      const tx = await writeContractAsync({
        address: contractAddress,
        abi: contractAbi,
        functionName: "swapExactTokensForTokens",
        args: [parseEther(amountIn), 0, [tokenAAddress, tokenBAddress], connectedAddress, deadline],
      });

      setTxHash(tx); // ✅ trigger waitForReceipt
      setTxDetails({
        hash: tx,
        amountA: amountIn,
        amountB: calculatedAmountB,
      });
      setShowModal(true);
    } catch (err) {
      console.error("Swap failed:", err);
    } finally {
      setIsSubmitting(false);
    }
  };

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
              placeholder="Amount Token A"
              value={amountIn}
              onChange={e => setAmountIn(e.target.value)}
              className="w-full border border-gray-300 rounded px-4 py-2 mb-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 rounded mb-2"
              onClick={handleSwap}
              disabled={isSubmitting}
            >
              {isSubmitting ? "Swapping..." : "Swap A ➝ B"}
            </button>

            <button className="w-full bg-gray-200 hover:bg-gray-300 text-gray-700 font-medium py-2 rounded">
              Approve Token A
            </button>
          </div>

          {/* Debug or Info Box */}
          <div className="bg-white p-6 shadow rounded border">
            <h2 className="text-lg font-semibold mb-2 text-gray-800">Tools</h2>
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

      {/* Modal */}
      {showModal && txDetails && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-md">
            <h3 className="text-lg font-bold mb-4 text-blue-700">Transaction Summary</h3>
            <ul className="text-sm text-gray-700 space-y-2">
              <li>
                <strong>Amount Token A:</strong> {txDetails.amountA}
              </li>
              <li>
                <strong>Estimated Token B:</strong> {txDetails.amountB}
              </li>
              <li>
                <strong>Fee:</strong> 0% (demo)
              </li>
              <li>
                <strong>Tx Hash:</strong>{" "}
                <a
                  href={`https://sepolia.etherscan.io/tx/${txDetails.hash}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-600 underline break-all"
                >
                  {txDetails.hash}
                </a>
              </li>
            </ul>
            {receipt && <p className="mt-4 text-green-600 text-sm">Transaction confirmed ✅</p>}
            <button
              onClick={() => setShowModal(false)}
              className="mt-4 bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;
