import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalasService } from './salas.service';
import { SalasController } from './salas.controller';
import { SalasEntity } from './salas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SalasEntity])],
  providers: [SalasService],
  controllers: [SalasController],
})
export class SalasModule {}
