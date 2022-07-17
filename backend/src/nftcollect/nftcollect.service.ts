import { Injectable } from '@nestjs/common';
import { ProviderService } from 'src/shared/services/provider/provider.service';
import { SignerService } from 'src/shared/services/signer/signer.service';
import { ethers } from 'ethers';
import * as NFTContract from '../assets/contracts/ApeToken.sol/ApeToken.json';
@Injectable()
export class NFTCollectService {
  nftContract: ethers.Contract;

  constructor(
    private providerService: ProviderService,
    private signerService: SignerService,
  ) {
    this.setupContractInstances();
  }

  setupContractInstances() {
    const contractAddress = process.env.NFT_CONTRACT_ADDRESS;
    if (!contractAddress || contractAddress.length === 0) return;
    console.log(contractAddress);
    this.nftContract = new ethers.Contract(
      contractAddress,
      NFTContract.abi,
      this.signerService.signer,
    );
  }

  async metadata(tokenId: number) {
    const result = await this.nftContract.tokenURI(tokenId);
    return result;
  }

  async baseURI() {
    return process.env.BASE_URI;
  }
}
