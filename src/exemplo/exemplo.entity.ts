import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('exemplo')
export class ExemploEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;
}
