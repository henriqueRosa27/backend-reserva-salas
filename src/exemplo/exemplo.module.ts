import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExemploService } from './exemplo.service';
import { ExemploController } from './exemplo.controller';
import { ExemploEntity } from './exemplo.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ExemploEntity])],
  providers: [ExemploService],
  controllers: [ExemploController],
})
export class ExemploModule {}
