import { Contract, ethers } from "ethers";
import * as apeTokenJson from "../artifacts/contracts/ApeToken.sol/ApeToken.json"
import { ApeToken } from "../typechain";
async function main(signer: ethers.Wallet, apeTokenAddress: string) {
  // =================================================================
  // Mint NF
  // =================================================================
  const apeTokenContract: ApeToken = new Contract(
    apeTokenAddress,
    apeTokenJson.abi,
    signer
  ) as ApeToken;
  const tx = await apeTokenContract.mint(signer.address)
  await tx.wait(1);
  console.log("Mint NFT tokens for address", signer.address);
  console.log("Mint NFT transacton", tx.hash);
  return tx;
}

export default main;