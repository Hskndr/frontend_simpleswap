import { ethers } from "hardhat";
import { expect } from "chai";

describe("SimpleSwap (usando contratos reales en Sepolia)", function () {
  it("debería devolver el precio entre TokenA y TokenB", async function () {
    const simpleSwapAddress = "0xED79BbAFED4fb2D0cfF8E26A442faDC75471FC09";
    const tokenAAddress = "0x617E43FCAadEc63172574F7A51836B2De0927e6d";
    const tokenBAddress = "0xa222430736e5c77De41Ce322eA3A63221cb9ee2e";

    // Conectarse al contrato desplegado
    const SimpleSwap = await ethers.getContractFactory("SimpleSwap");
    const simpleSwap = SimpleSwap.attach(simpleSwapAddress);

    // Ejecutar getPrice()
    const price = await simpleSwap.getPrice(tokenAAddress, tokenBAddress);

    console.log(`Precio entre TokenA y TokenB: ${price.toString()}`);

    // Verificar que el precio sea positivo
    expect(price).to.be.gt(0);
  });
});
