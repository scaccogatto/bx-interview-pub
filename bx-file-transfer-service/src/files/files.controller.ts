import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  InternalServerErrorException,
  NotFoundException,
  Param,
  Post,
} from '@nestjs/common';
import { ApiBody, ApiResponse } from '@nestjs/swagger';
import { WINSTON_MODULE_PROVIDER } from 'nest-winston';
import { Logger } from 'winston';
import { Topics } from '../configs/env';
import { StorageService } from '../storage/storage.service';
import { CreateRequestDto } from './dtos/create-request.dto';
import { CreateResponseDto } from './dtos/create-response.dto';
import { FindOneResponseDto } from './dtos/find-one-response.dto';
import { FilesService } from './files.service';

@Controller('files')
export class FilesController {
  constructor(
    @Inject(WINSTON_MODULE_PROVIDER) private readonly loggerService: Logger,
    private readonly filesService: FilesService,
  ) {}

  @Post('create')
  @HttpCode(201)
  @ApiBody({
    type: CreateRequestDto,
  })
  @ApiResponse({
    type: CreateResponseDto,
    status: 201,
  })
  async create(
    @Body('fileName') fileName: string,
    @Body('contentType') contentType: string,
    // @Body('category') category: string, // TODO: add searchable data
    // @Body('size', ParseIntPipe, new EqualOrLessPipe(10000)) fileSize: number,
  ): Promise<CreateResponseDto> {
    const objectName = StorageService.generateObjectName();

    // TODO: remove the constant when we will have a real database
    // StorageService.chunksNumberFromSize(fileSize);
    const chunksCount = 10000;

    try {
      await this.filesService.saveMetadata(fileName, contentType, chunksCount);

      return {
        objectName,
        uploadTopic: `${Topics.uploadTopic}/${objectName}`,
      };
    } catch {
      this.loggerService.error('cannot save file metadata');
      throw new InternalServerErrorException('cannot save file metadata');
    }
  }

  @Get(':id')
  @HttpCode(200)
  @ApiResponse({
    type: FindOneResponseDto,
    status: 200,
  })
  async findOne(@Param('id') id: string) {
    try {
      const metadata = await this.filesService.getMetadata(id);
      return metadata;
    } catch (e) {
      throw new NotFoundException('file not found');
    }
  }
}
