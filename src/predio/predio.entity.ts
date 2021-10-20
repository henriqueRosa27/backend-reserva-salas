import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('predio')
export class PredioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;
  
  @Column({name: 'status' })
  status: boolean;
}
