import deploy from "./deploy";
import getWalletAccount from "./get-wallet-account";
import mint from "./mint";
import getTokenUri from "./get-token-uri";
import "dotenv/config";

async function main() {
  const ownerSigner = await getWalletAccount(
    process.env.PRIVATE_KEY,
    process.env.MNEMONIC
  );

  // =================================================================
  // Check the baseURI
  // =================================================================
  if (process.argv.length < 3) {
    throw new Error("BaseURI missing");
  }

  // =================================================================
  // Deploy the NFT contract
  // =================================================================
  const baseURI = process.argv[2];
  const nftTokenContractAddress = await deploy(ownerSigner, baseURI);
  // =================================================================
  // Mint the NFT 10 times
  // =================================================================
  for (let i = 0; i < 10; i++) {
    await mint(ownerSigner, nftTokenContractAddress);
    await getTokenUri(ownerSigner, nftTokenContractAddress, i)
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
