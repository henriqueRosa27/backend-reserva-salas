import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalasEntity } from './salas.entity';

@Injectable()
export class SalasService {
  constructor(
    @InjectRepository(SalasEntity)
    private readonly rep: Repository<SalasEntity>,
  ) {}

  async getAll(): Promise<SalasEntity[]> {
    const salas = await this.rep.find({ order: { nome: 'ASC' } });
    return salas;
  }

  async findById(id: number): Promise<SalasEntity> {
    const sala = await this.rep.findOne({ where: { id } });

    if (sala) return sala;

    throw new HttpException(
      { erro: 'Sala não existe' },
      HttpStatus.NOT_FOUND,
    );
  }

  async create(sala: SalasEntity): Promise<SalasEntity> {
    const entity = await this.rep.save(sala);

    return entity;
  }

  async update(sala: SalasEntity, id: number): Promise<SalasEntity> {
    const entitySalvaSala = await this.findById(id);

    entitySalvaSala.nome = sala.nome;
    entitySalvaSala.andar= sala.andar;
    entitySalvaSala.equipamentos= sala.equipamentos;
    //entitySalvaSala.acessibilidade= sala.acessibilidade;
    //entitySalvaSala.predio= sala.predio;
    entitySalvaSala.predio_id=sala.predio_id;
    entitySalvaSala.status_sala=sala.status_sala;
    entitySalvaSala.intervalo= sala.intervalo;
    entitySalvaSala.salas_especiais= sala.salas_especiais;
    entitySalvaSala.capacidade= sala.capacidade;
    const entity = await this.rep.save(entitySalvaSala);

    return entity;

  }

  async delete(id: number): Promise<null> {
    const entitySalva = await this.findById(id);

    await this.rep.remove(entitySalva);

    return null;
  }
}