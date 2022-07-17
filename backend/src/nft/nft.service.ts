import { Injectable } from "@nestjs/common";    
import { ProviderService } from 'src/shared/services/provider/provider.service';
import { SignerService } from 'src/shared/services/signer/signer.service';
import { ethers } from 'ethers';
import * as NFTContract from '../assets/contracts/ApeToken.sol/ApeToken.json';

@Injectable()
export class NFTService {
    nftContract: ethers.Contract;
    
    async metadata(tokenId: number) {
        const result = await this.nftContract.tokenURI(tokenId);
        return result;
      }

    async baseURI() {
        return process.env.BASE_URI;
      }
    }

    