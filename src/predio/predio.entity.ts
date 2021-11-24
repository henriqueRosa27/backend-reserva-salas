import { SalaEntity } from 'src/sala/sala.entity';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity('predio')
export class PredioEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ name: 'nome' })
  nome: string;

  @Column({ name: 'status' })
  status: boolean;

  @OneToMany(() => SalaEntity, (sala) => sala.predio)
  salas: SalaEntity[];
}
