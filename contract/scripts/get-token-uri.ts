import { BigNumberish, Contract, ethers } from "ethers";
import * as apeTokenJson from "../artifacts/contracts/ApeToken.sol/ApeToken.json"
import { ApeToken } from "../typechain";
async function main(signer: ethers.Wallet, apeTokenAddress: string, tokenId: BigNumberish) {
  // =================================================================
  // Mint NF
  // =================================================================
  const apeTokenContract: ApeToken = new Contract(
    apeTokenAddress,
    apeTokenJson.abi,
    signer
  ) as ApeToken;
  const tokenURI = await apeTokenContract.tokenURI(tokenId)
  console.log(`NFT token URI : " : ${tokenURI}`)
}

export default main;