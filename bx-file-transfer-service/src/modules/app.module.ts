import { Module } from '@nestjs/common';
import { GlobalModule } from './global.module';
import { FilesModule } from 'src/files/files.module';
import { StorageModule } from 'src/storage/storage.module';

@Module({
  imports: [GlobalModule.forRoot({ isGlobal: true }), FilesModule, StorageModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
