import { ethers } from "ethers";
import * as apeTokenJson from "../artifacts/contracts/ApeToken.sol/ApeToken.json"
async function main(signer: ethers.Wallet, baseURI: string) {
  console.log(`BaseURI : ${baseURI}`)
  // =================================================================
  // Deploy NFT Contract
  // =================================================================
  const apeTokenFactory = new ethers.ContractFactory(
    apeTokenJson.abi,
    apeTokenJson.bytecode,
    signer
  );

  const apeTokenContract = await apeTokenFactory.deploy(baseURI);

  console.log("Awaiting confirmations");
  await apeTokenContract.deployed();
  console.log("Completed");
  console.log(`NFTContract deployed at ${apeTokenContract.address}`);
  return apeTokenContract.address;
}

export default main;