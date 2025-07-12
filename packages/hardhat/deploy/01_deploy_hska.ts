import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployHskA: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy("HskA", {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployHskA;
deployHskA.tags = ["HskA"];
