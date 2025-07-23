import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { DatabaseService } from './database.service';
import { AppConfig } from '../app-config';

@Module({
  imports: [
    MongooseModule.forRootAsync({
      //   imports: [ConfigModule],
      //   inject: [ConfigService], // Inject ConfigService
      useFactory: (configService: ConfigService<AppConfig>) => ({
        uri: configService.get('MONGODB_URI'),
      }),
      inject: [ConfigService],
    }),
  ],
  providers: [DatabaseService],
  exports: [DatabaseService],
})
export class DatabaseModule {}
