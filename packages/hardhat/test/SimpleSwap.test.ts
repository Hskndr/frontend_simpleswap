import { expect } from "chai";
import { ethers } from "hardhat"; // ✅ Usa ethers desde Hardhat (NO de "ethers")
import { ERC20__factory, SimpleSwap__factory, SimpleSwap } from "../typechain-types";

describe("SimpleSwap (usando contratos reales en Sepolia)", function () {
    const simpleSwapAddress = "0xED79BbAFED4fb2D0cfF8E26A442faDC75471FC09";
    const tokenA = "0x617E43FCAadEc63172574F7A51836B2De0927e6d";
    const tokenB = "0xa222430736e5c77De41Ce322eA3A63221cb9ee2e";

    it("debería devolver el precio entre TokenA y TokenB", async function () {
        const [signer] = await ethers.getSigners();
        const simpleSwap: SimpleSwap = SimpleSwap__factory.connect(simpleSwapAddress, signer);

        const price = await simpleSwap.getPrice(tokenA, tokenB);
        console.log(`Precio entre TokenA y TokenB: ${price.toString()}`);

        expect(price).to.be.gt(0);
    });

    it("debería agregar liquidez correctamente", async function () {
        const [signer] = await ethers.getSigners();

        const tokenAContract = ERC20__factory.connect(tokenA, signer);
        const tokenBContract = ERC20__factory.connect(tokenB, signer);
        const simpleSwap: SimpleSwap = SimpleSwap__factory.connect(simpleSwapAddress, signer);

        const amountA = ethers.parseUnits("10", 18);
        const amountB = ethers.parseUnits("20", 18);
        const deadline = Math.floor(Date.now() / 1000) + 600;

        await tokenAContract.approve(simpleSwapAddress, amountA);
        await tokenBContract.approve(simpleSwapAddress, amountB);

        const tx = await simpleSwap.addLiquidity(
            tokenA,
            tokenB,
            amountA,
            amountB,
            amountA,
            amountB,
            signer.address,
            deadline
        );

        const receipt = await tx.wait();

        if (receipt?.logs) {
            for (const log of receipt.logs) {
                console.log("Log address:", log.address);
                console.log("Log topics:", log.topics);
                console.log("Log data:", log.data);
            }
        }


        expect(receipt?.status).to.equal(1);
    });
});
