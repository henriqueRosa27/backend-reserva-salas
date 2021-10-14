import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { SalaEntity } from './sala.entity';


@Injectable()
export class SalaService {
    constructor(
        @InjectRepository(SalaEntity)
        private readonly rep: Repository<SalaEntity>,
      ) {}
    
      async getAll(): Promise<SalaEntity[]> {
        const salas = await this.rep.find({ order: { nome: 'ASC' } });
        return salas;
      }
    
      async findById(id: number): Promise<SalaEntity> {
        const sala = await this.rep.findOne({ where: { id } });
    
        if (sala) return sala;
    
        throw new HttpException(
          { erro: 'Exemplo não existe' },
          HttpStatus.NOT_FOUND,
        );
      }
    
      async create(sala: SalaEntity): Promise<SalaEntity> {
        const entity = await this.rep.save(sala);
    
        return entity;
      }
    
      async update(sala: SalaEntity, id: number): Promise<SalaEntity> {
        const entitySalva = await this.findById(id);
    
        entitySalva.nome = sala.nome;
        entitySalva.intervalo = sala.intervalo;
        entitySalva.andar = sala.andar;
        entitySalva.capacidade = sala.capacidade;
        entitySalva.local = sala.local;
        entitySalva.numero_sala = sala.numero_sala;
        entitySalva.sala_especial = sala.sala_especial;
        entitySalva.acessibilidade = sala.acessibilidade;
        entitySalva.equipamento = sala.equipamento;
        const entity = await this.rep.save(entitySalva);
        return entity;
      }
    
      async delete(id: number): Promise<null> {
        const entitySalva = await this.findById(id);
    
        await this.rep.remove(entitySalva);
    
        return null;
      }
}
