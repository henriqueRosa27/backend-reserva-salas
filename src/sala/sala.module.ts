
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SalaController } from './sala.controller';
import { SalaEntity } from './sala.entity';
import { SalaService } from './sala.service';

@Module({
    imports: [TypeOrmModule.forFeature([SalaEntity])],
    providers: [SalaService],
    controllers: [SalaController],
})
export class SalaModule {}
