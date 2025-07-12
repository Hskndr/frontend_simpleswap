import { useScaffoldReadContract } from "~~/hooks/scaffold-eth";
import { Address } from "viem";

type TokenPriceProps = {
  tokenIn: Address;
  tokenOut: Address;
};

export const TokenPrice = ({ tokenIn, tokenOut }: TokenPriceProps) => {
  const { data: price, isLoading, error } = useScaffoldReadContract({
    contractName: "SimpleSwap",
    functionName: "getPrice",
    args: [tokenIn, tokenOut], // Only pass the required two arguments
  });

  if (isLoading) return <div>Loading price...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
    <div className="p-4 border rounded-lg shadow bg-white">
      <p className="text-lg font-semibold">Precio 1 TokenIn = {price?.toString()} TokenOut</p>
    </div>
  );
};
