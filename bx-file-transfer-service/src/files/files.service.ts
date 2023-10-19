import { Inject, Injectable } from '@nestjs/common';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Topics } from '../configs/env';
import { StorageService } from '../storage/storage.service';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(@Inject(WINSTON_MODULE_PROVIDER) private readonly loggerService: Logger) {}

  async saveMetadata(fileName: string, contentType: string, chunksCount: number) {
    this.loggerService.info('mocking FileService.saveMetadata method');
    return typeof fileName === 'string' && typeof contentType === 'string' && typeof chunksCount === 'number';
  }

  async getMetadata(objName: string): Promise<FileEntity> {
    this.loggerService.info('mocking FileService.getMetadata method');

    return {
      objName,
      downloadTopic: `${Topics.downloadTopic}/${objName}`,
      // TODO: remove the calc when we will have a real database
      chunksCount: StorageService.chunksNumberFromSize(10000),
      originalName: 'mock-file-name.pdf',
      originalFileSize: 10000,
      contentType: 'application/pdf',
    };
  }
}
