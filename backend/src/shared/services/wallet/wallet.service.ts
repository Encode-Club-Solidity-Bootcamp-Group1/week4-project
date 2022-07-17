import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class WalletService {
  wallet: ethers.Wallet;

  constructor() {
    this.setupWallet();
  }

  setupWallet() {
    const mnemonic = process.env.ADMIN_WALLET_SEED;
    const privateKey = process.env.PRIVATE_KEY;
    this.wallet =
      mnemonic && mnemonic.length > 0
        ? ethers.Wallet.fromMnemonic(mnemonic)
        : new ethers.Wallet(privateKey);
  }

  walletAddress() {
    return this.wallet.address;
  }
}
