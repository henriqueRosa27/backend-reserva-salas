import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { ValidationNumberPipe, ValidationPipe } from 'src/validation.pipe';
import { SalaEntity } from './sala.entity';
import { SalaService } from './sala.service';
import { salaValidation, altera_statusValidation } from './sala.validation';

@Controller('salas')
export class SalaController {
  constructor(private readonly service: SalaService) {}

  @Get()
  async getAll(): Promise<SalaEntity[]> {
    return this.service.getAll();
  }

  @Get(':id')
  async finById(
    @Param('id', ValidationNumberPipe) id: number,
  ): Promise<SalaEntity> {
    return await this.service.findById(id);
  }

  @Post()
  async create(
    @Body(new ValidationPipe(salaValidation)) sala: SalaEntity,
  ): Promise<SalaEntity> {
    return await this.service.create(sala);
  }

  @Put(':id/altera-status')
  async altera_status(
    @Body(new ValidationPipe(altera_statusValidation)) dto: SalaEntity,
    @Param('id') id: number,
  ): Promise<SalaEntity> {
    return await this.service.altera_status(dto, id);
  }

  @Put(':id')
  async update(
    @Body(new ValidationPipe(salaValidation)) dto: SalaEntity,
    @Param('id') id: number,
  ): Promise<SalaEntity> {
    return await this.service.update(dto, id);
  }

  @Delete(':id')
  @HttpCode(204)
  async delete(@Param('id') id: number): Promise<null> {
    return await this.service.delete(id);
  }
}
