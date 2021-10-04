import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ExemploEntity } from './exemplo/exemplo.entity';
import { ExemploModule } from './exemplo/exemplo.module';

const configDatabase: ConnectionOptions = {
  type: 'postgres',
  host: 'ec2-35-171-171-27.compute-1.amazonaws.com',
  database: 'd426unnejsbpip',
  port: 5432,
  username: 'dhfdkqoiqdiozs',
  password: '63133079f88bb9d34bb7edf5ecac7d7530e45af57d9429cd3f5db96858e4a7f6',
  ssl: {
    rejectUnauthorized: false,
  },
  entities: [ExemploEntity],
};

@Module({
  imports: [TypeOrmModule.forRoot(configDatabase), ExemploModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
