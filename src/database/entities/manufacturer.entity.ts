import { Entity, Column, CreateDateColumn, PrimaryColumn, OneToMany } from 'typeorm';
import { Car } from './car.entity';

@Entity('manufacturer')
export class Manufacturer {
  @PrimaryColumn()
  name!: string;

  @OneToMany(() => Car, car => car.manufacturer)
  cars!: Car[];

  @CreateDateColumn()
  created_at!: string;
}