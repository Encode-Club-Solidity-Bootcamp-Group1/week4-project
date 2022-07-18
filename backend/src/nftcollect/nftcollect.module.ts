import { Module } from '@nestjs/common';
import { NFTCollectService } from './nftcollect.service';
import { NFTCollectController } from './nftcollect.controller';

@Module({
  controllers: [NFTCollectController],
  providers: [NFTCollectService],
})
export class NFTCollectModule {}
