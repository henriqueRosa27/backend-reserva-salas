import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { PredioController } from './predio.controller';
import { PredioEntity } from './predio.entity';
import { PredioService } from './predio.service';

@Module({
    imports: [TypeOrmModule.forFeature([PredioEntity])],
    providers: [PredioService],
    controllers: [PredioController],
})
export class PredioModule {}
