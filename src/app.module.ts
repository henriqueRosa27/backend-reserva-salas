import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConnectionOptions } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PredioEntity } from './predio/predio.entity';
import { PredioModule } from './predio/predio.module';
import { SalaEntity } from './sala/sala.entity';
import { SalaModule } from './sala/sala.module';

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
  entities: [PredioEntity, SalaEntity]
};

@Module({
  imports: [TypeOrmModule.forRoot(configDatabase), SalaModule , PredioModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
