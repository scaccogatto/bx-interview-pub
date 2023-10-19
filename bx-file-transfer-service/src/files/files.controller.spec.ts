import { Test, TestingModule } from '@nestjs/testing';
import { WinstonModule } from 'nest-winston';
import { loggerConfig } from '../configs/logger';
import { FilesController } from './files.controller';
import { FilesService } from './files.service';

describe('UploadsController', () => {
  let controller: FilesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      imports: [WinstonModule.forRoot(loggerConfig)],
      controllers: [FilesController],
      providers: [FilesService],
    }).compile();

    controller = module.get<FilesController>(FilesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });

  it('should create a file line in the database', async () => {
    const creation = await controller.create('test', 'application/pdf');
    expect(creation).toBeTruthy();
  });

  it('should get a file metadata on call', async () => {
    const creation = await controller.create('test', 'application/pdf');
    const metadata = await controller.findOne(creation.objectName);
    expect(metadata).toBeTruthy();
  });
});
