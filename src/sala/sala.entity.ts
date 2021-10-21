import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sala')
export class SalaEntity {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ name: 'nome'}) 
  nome: string;

  @Column({ name: 'intervalo'}) 
  intervalo: string; // atenção!!!!!!!

  @Column({ name: 'equipamento'}) 
  equipamento: string;

  @Column({ name: 'sala_especial'}) 
  sala_especial: string;

  @Column({ name: 'numero_sala'}) 
  numero_sala: number;

  @Column({ name: 'andar'}) 
  andar: number;

  @Column({ name: 'capacidade'}) 
  capacidade: number;

  @Column({ name: 'acessibilidade'}) 
  acessibilidade: boolean;

  @Column({ name: 'local'}) 
  local: string; // atenção!!!!!!
}