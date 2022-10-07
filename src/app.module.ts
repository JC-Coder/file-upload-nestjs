import { Module } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { AppController } from './app.controller';


@Module({
  imports: [
    MulterModule.register({
      dest: './uploads/images',
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname,'..', 'uploads'),
    })
  ],
  controllers: [AppController],
  providers: [],
})
export class AppModule {}