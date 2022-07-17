import { Injectable } from '@nestjs/common';
import { ProviderService } from 'src/shared/services/provider/provider.service';
import { SignerService } from 'src/shared/services/signer/signer.service';
import { ethers } from 'ethers';
import * as NFTContract from '../assets/contracts/ApeToken.sol/ApeToken.json';

@Injectable()
export class ContractService {
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
    this.nftContract = new ethers.Contract(
      contractAddress,
      NFTContract.abi,
      this.providerService.provider,
    );
  }

  async metadata(tokenId: number) {
    const res = await this.nftContract.tokenURI(tokenId);
    return res;
  }
}
