import { Controller, Get, HttpException, Param } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { ContractService } from './contract.service';

@Controller('contract')
@ApiTags('contract')
export class ContractController {
  constructor(private readonly contractService: ContractService) {}

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
      const result = await this.contractService.metadata(tokenId);
      return result;
    } catch (error) {
      throw new HttpException(error.message, 503);
    }
  }
}
