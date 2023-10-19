import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from '../configs/logger';
import { FilesService } from './files.service';

describe('FileService', () => {
  let service: FilesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot(loggerConfig)],
      providers: [FilesService],
    }).compile();

    service = module.get<FilesService>(FilesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should create a file line in the database', async () => {
    const creation = await service.saveMetadata('test', 'application/pdf', 10);
    expect(creation).toBeTruthy();
  });

  it('should get a file metadata on call', async () => {
    await service.saveMetadata('test', 'application/pdf', 10);
    const metadata = await service.getMetadata('test');
    expect(metadata).toBeTruthy();
  });
});
