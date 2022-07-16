import {
  Controller,
  Get,
  Param,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { Express } from 'express';
import { FileInterceptor } from '@nestjs/platform-express';
import { AppService } from './app.service';

import { NFTStorage, File } from 'nft.storage';
import { JsonDB } from 'node-json-db';
import { Config } from 'node-json-db/dist/lib/JsonDBConfig';

const db = new JsonDB(new Config('myDataBase', true, false, '/'));

const NFT_STORAGE_KEY =
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJkaWQ6ZXRocjoweDY2MmJBMTI3NzgyQ2YwMzY5RWJlNjBjNWQ3RTY3NTdhMjMzMzkzMWIiLCJpc3MiOiJuZnQtc3RvcmFnZSIsImlhdCI6MTY1Nzk3MzY5MDkxNiwibmFtZSI6ImJvb3RjYW1wIn0.jc9Sygkjdnk8WnuQqmumVzUkA8emzQ9Vt7bltkkNSbw';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }

  @Get('/files')
  getAllFiles(): string {
    return db.getData('/files');
  }

  @Get('/files/:id')
  getFileById(@Param() params): string {
    return db.getData(`/files/${params.id}`);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    const nftstorage = new NFTStorage({ token: NFT_STORAGE_KEY });
    const results = await nftstorage.store({
      image: new File([file.buffer], file.originalname),
      name: file.originalname,
      description: 'Bootcamp week4 - group1 - NFT collection',
      ...{},
    });
    const dataToSave = {
      cid: results.ipnft,
      url: results.url,
      resolvedUrl: `https://ipfs.io/ipfs/${results.ipnft}/metadata.json`,
    };
    db.push(`/files/${results.ipnft}`, dataToSave);
    return dataToSave;
  }
}
