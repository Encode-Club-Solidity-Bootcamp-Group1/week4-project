import { Injectable } from '@nestjs/common';
import { ethers } from 'ethers';

@Injectable()
export class ProviderService {
  provider: ethers.providers.BaseProvider;
  constructor() {
    this.setupProvider();
  }

  setupProvider() {
    const networkName = process.env.PROVIDER_NETWORK;
    if (!networkName || networkName.length === 0) return;
    const infuraOptions = process.env.PROVIDER_OPTIONS_INFURA_PROJECT_ID
      ? process.env.PROVIDER_OPTIONS_INFURA_PROJECT_SECRET
        ? {
            projectId: process.env.PROVIDER_OPTIONS_INFURA_PROJECT_ID,
            projectSecret: process.env.PROVIDER_OPTIONS_INFURA_PROJECT_SECRET,
          }
        : process.env.PROVIDER_OPTIONS_INFURA_PROJECT_ID
      : '';
    const options = {
      alchemy: process.env.PROVIDER_OPTIONS_ALCHEMY_TOKEN,
      infura: infuraOptions,
    };
    const provider = ethers.providers.getDefaultProvider(networkName, options);
    this.provider = provider;
  }
}
