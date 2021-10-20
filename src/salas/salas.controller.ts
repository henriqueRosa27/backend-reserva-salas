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
  import { SalasEntity } from './salas.entity';
  import { SalasService } from './salas.service';
  import { salasValidation } from './salas.validation';
  
  @Controller('salas')
  export class SalasController {
    constructor(private readonly service: SalasService) {}
  
    @Get()
    async getAll(): Promise<SalasEntity[]> {
      return this.service.getAll();
    }
  
    @Get(':id')
    async finById(
      @Param('id', ValidationNumberPipe) id: number,
    ): Promise<SalasEntity> {
      return await this.service.findById(id);
    }
  
    @Post()
    async create(
      @Body(new ValidationPipe(salasValidation)) sala: SalasEntity,
    ): Promise<SalasEntity> {
      return await this.service.create(sala);
    }
  
    @Put(':id')
    async update(
      @Body(new ValidationPipe(salasValidation)) dto: SalasEntity,
      @Param('id') id: number,
    ): Promise<SalasEntity> {
      return await this.service.update(dto, id);
    }
  
    @Delete(':id')
    @HttpCode(204)
    async delete(@Param('id') id: number): Promise<null> {
      return await this.service.delete(id);
    }
  }
  