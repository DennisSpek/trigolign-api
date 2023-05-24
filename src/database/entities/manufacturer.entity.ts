import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('manufacturers')
export class Manufacturer {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({unique: true})
  name!: string;

  @CreateDateColumn()
  created_at!: string;
}