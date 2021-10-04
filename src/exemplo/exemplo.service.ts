import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ExemploEntity } from './exemplo.entity';

@Injectable()
export class ExemploService {
  constructor(
    @InjectRepository(ExemploEntity)
    private readonly rep: Repository<ExemploEntity>,
  ) {}

  async getAll(): Promise<ExemploEntity[]> {
    const exemplos = await this.rep.find({ order: { nome: 'ASC' } });
    return exemplos;
  }

  async findById(id: number): Promise<ExemploEntity> {
    const exemplo = await this.rep.findOne(id);

    if (exemplo) return exemplo;

    throw new HttpException(
      { erro: 'Exemplo não existe' },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(exemplo: ExemploEntity): Promise<ExemploEntity> {
    const entity = await this.rep.save(exemplo);

    return entity;
  }

  async update(exemplo: ExemploEntity, id: number): Promise<ExemploEntity> {
    const entitySalva = await this.findById(id);

    entitySalva.nome = exemplo.nome;
    const entity = await this.rep.save(entitySalva);
    return entity;
  }

  async delete(id: number): Promise<null> {
    const entitySalva = await this.findById(id);

    await this.rep.remove(entitySalva);

    return null;
  }
}
