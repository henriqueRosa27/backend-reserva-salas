import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('sala')
export class SalaEntity {
  @PrimaryGeneratedColumn() 
  id: number;

  @Column({ name: 'nome'}) 
  nome: string;

  @Column({ name: 'inicio_intervalo'}) 
  intervalo_inicio: string; // atenção!!!!!!!
  
  @Column({ name: 'status'}) 
  status: boolean;

  @Column({ name: 'predio_id'}) 
  predio_id: number;

  @Column({ name: 'fim_intervalo'}) 
  intervalo_fim: string;

  @Column({ name: 'equipamentos'}) 
  equipamentos: string;

  @Column({ name: 'salas_especiais'}) 
  salas_especiais: string;

  @Column({ name: 'andar'}) 
  andar: number;

  @Column({ name: 'capacidade'}) 
  capacidade: number;

  
}