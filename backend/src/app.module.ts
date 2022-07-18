import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { SharedModule } from './shared/shared.module';
import { WalletModule } from './wallet/wallet.module';
import { NFTCollectModule } from './nftcollect/nftcollect.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    SharedModule,
    WalletModule,
    NFTCollectModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
