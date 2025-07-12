import { useWalletClient, useAccount } from "wagmi";
import { useEffect, useState } from "react";
import { ethers } from "ethers";
import { Web3Provider } from "@ethersproject/providers";

import SimpleSwapABI from "~~/abis/SimpleSwap.json";

// Dirección real de tu contrato en Sepolia
const SIMPLESWAP_ADDRESS = "0x73151e303094a04103FA05cBe89afc507c469280";

export const useSimpleSwap = () => {
  const { data: walletClient } = useWalletClient();
  const { isConnected } = useAccount();
  const [contract, setContract] = useState<ethers.Contract | null>(null);

  useEffect(() => {
    if (!walletClient || !isConnected) {
      setContract(null);
      return;
    }

    const provider = new Web3Provider(walletClient.transport);

    const signer = provider.getSigner();

    const contractInstance = new ethers.Contract(
      SIMPLESWAP_ADDRESS,
      SimpleSwapABI
    );

    setContract(contractInstance);
  }, [walletClient, isConnected]);

  const getPrice = async (amountIn: string, isAToB: boolean) => {
    if (!contract) return null;
    try {
      const price = await contract.getPrice(amountIn, isAToB);
      return price;
    } catch (err) {
      console.error("Error al obtener precio:", err);
      return null;
    }
  };

  const swapExactTokensForTokens = async (amountIn: string, isAToB: boolean) => {
    if (!contract) return null;
    try {
      const tx = await contract.swapExactTokensForTokens(amountIn, isAToB);
      await tx.wait();
      return tx.hash;
    } catch (err) {
      console.error("Error en el swap:", err);
      return null;
    }
  };

  return {
    contract,
    getPrice,
    swapExactTokensForTokens,
    chainId: walletClient?.chain.id,
  };
};
