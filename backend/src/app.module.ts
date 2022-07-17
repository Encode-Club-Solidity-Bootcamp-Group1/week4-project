import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { BlockModule } from './block/block.module';
import { AccountModule } from './account/account.module';
import { WalletModule } from './wallet/wallet.module';
import { ContractModule } from './contract/contract.module';
import { NFTModule } from './nft/nft.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    BlockModule,
    AccountModule,
    WalletModule,
    ContractModule,
    NFTModule 
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
