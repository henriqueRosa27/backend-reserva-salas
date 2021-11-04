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
          { erro: 'Sala não existe' },
          HttpStatus.NOT_FOUND,
        );
      }
    
      async create(sala: SalaEntity): Promise<SalaEntity> {
       // await this.checkName(sala.nome, sala.predio_id);
        const entity = await this.rep.save(sala);
    
        return entity;
      }
      async altera_status(sala: SalaEntity, id: number): Promise<SalaEntity> {
        const entitySalva = await this.findById(id);
  
        entitySalva.status = sala.status;
        const entity = await this.rep.save(entitySalva);
        return entity;

      }
    
      async update(sala: SalaEntity, id: number): Promise<SalaEntity> {
        const entitySalva = await this.findById(id);
       // await this.checkName(sala.nome, sala.predio_id, id);
        entitySalva.nome = sala.nome;
        entitySalva.intervalo_inicio = sala.intervalo_inicio;
        entitySalva.intervalo_fim = sala.intervalo_fim;
        entitySalva.andar = sala.andar;
        entitySalva.status= sala.status;
        entitySalva.predio_id=sala.predio_id;
        entitySalva.capacidade = sala.capacidade;
        entitySalva.salas_especiais = sala.salas_especiais;
        entitySalva.equipamentos = sala.equipamentos;
        const entity = await this.rep.save(entitySalva);
        return entity;
      }
    
      async delete(id: number): Promise<null> {
        const entitySalva = await this.findById(id);
    
        await this.rep.remove(entitySalva);
    
        return null;
      }

      // async checkName(nome: string, idPredio: number, id?: number): Promise<void> {
      //   let query = this.rep.createQueryBuilder("sala").where("sala.nome=:NOME", {NOME: nome});
      //   let queryPredio = this.rep.createQueryBuilder("predio").where("predio.id=:IDPREDIO", {IDPREDIO: idPredio});
      //   const resultPredio = await queryPredio.getOne();

      //   if(resultPredio) {
      //     if(id) {
      //       query = query.andWhere("sala.id<>:ID", {ID: id});
      //     }
      //     const result = await query.getOne()
          
      //     if(result) {
      //       throw new HttpException(
      //         { erro: 'Sala já existe!' },
      //         HttpStatus.BAD_REQUEST,
      //       );
      //     }
      //   }
      //   else {
      //     throw new HttpException(
      //       { erro: 'Predio não existe!' },
      //       HttpStatus.BAD_REQUEST,
      //     );
      //   }
      //}
}
