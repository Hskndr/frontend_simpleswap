import { DeployFunction } from "hardhat-deploy/types";
import { HardhatRuntimeEnvironment } from "hardhat/types";

const deploySimpleSwap: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy("SimpleSwap", {
    from: deployer,
    args: [], // <-- pon argumentos si tu constructor necesita
    log: true,
  });
};

export default deploySimpleSwap;
deploySimpleSwap.tags = ["SimpleSwap"];
