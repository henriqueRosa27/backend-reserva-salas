import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PredioEntity } from './predio.entity';

@Injectable()
export class PredioService {
    constructor(
        @InjectRepository(PredioEntity)
        private readonly rep: Repository<PredioEntity>,
      ) {}
    
      async getAll(): Promise<PredioEntity[]> {
        const predios = await this.rep.find({ order: { nome: 'ASC' } });
        return predios;
      }
    
      async findById(id: number): Promise<PredioEntity> {
        const predio = await this.rep.findOne({ where: { id } });
    
        if (predio) return predio;
    
        throw new HttpException(
          { erro: 'Predio não existe' },
          HttpStatus.NOT_FOUND,
        );
      }
    
      async create(predio: PredioEntity): Promise<PredioEntity> {
        const entity = await this.rep.save(predio);
    
        return entity;
      }
       async altera_status(predio: PredioEntity, id: number): Promise<PredioEntity> {
        const entitySalva = await this.findById(id);
    
        entitySalva.status = predio.status;
        const entity = await this.rep.save(entitySalva);
        return entity;

      }
    
      async update(predio: PredioEntity, id: number): Promise<PredioEntity> {
        const entitySalva = await this.findById(id);
    
        entitySalva.nome = predio.nome;
        entitySalva.status = predio.status;
        const entity = await this.rep.save(entitySalva);
        return entity;
      }
    
      async delete(id: number): Promise<null> {
        const entitySalva = await this.findById(id);
    
        await this.rep.remove(entitySalva);
    
        return null;
      }
}
