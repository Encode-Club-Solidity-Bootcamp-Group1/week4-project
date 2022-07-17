import { Module } from '@nestjs/common';
import { NFTService } from './nft.service';
import { NFTController } from './nft.controller';

@Module({
  controllers: [NFTController],
  providers: [NFTService],
})
export class NFTModule {}