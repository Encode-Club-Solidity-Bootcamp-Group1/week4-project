import {
  Controller,
  Get,
  HttpException,
  Param,
  Res,
  HttpStatus,
} from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { NFTCollectService } from './nftcollect.service';
import { Response } from 'express';

@Controller('nftcollect')
@ApiTags('nftcollect')
export class NFTCollectController {
  constructor(private readonly nftCollectService: NFTCollectService) {}

  @Get('metadata/:tokenId')
  @ApiOperation({
    summary: 'NFT metadata',
    description: 'Gets the NFT metadata from contract',
  })
  @ApiResponse({
    status: 200,
    description: 'MetaData',
    type: String,
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not connected to a valid provider',
    type: HttpException,
  })
  async getMetaData(@Param('tokenId') tokenId: number) {
    try {
      const result = await this.nftCollectService.metadata(tokenId);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }

  @Get('baseURI')
  @ApiOperation({
    summary: 'get NFT collect baseURI',
    description: 'Gets the NFT collect baseURI from contract',
  })
  @ApiResponse({
    status: 200,
    description: 'BaseURI',
    type: String,
  })
  @ApiResponse({
    status: 503,
    description: 'The server is not connected to a valid provider',
    type: HttpException,
  })
  async getBaseURI(@Res() res: Response) {
    try {
      const result = await this.nftCollectService.baseURI();
      res.status(HttpStatus.OK).json(result);
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }
}
