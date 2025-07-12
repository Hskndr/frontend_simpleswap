import { HardhatRuntimeEnvironment } from "hardhat/types";
import { DeployFunction } from "hardhat-deploy/types";

const deployHskB: DeployFunction = async function (hre: HardhatRuntimeEnvironment) {
  const { deploy } = hre.deployments;
  const { deployer } = await hre.getNamedAccounts();

  await deploy("HskB", {
    from: deployer,
    args: [],
    log: true,
  });
};

export default deployHskB;
deployHskB.tags = ["HskB"];
