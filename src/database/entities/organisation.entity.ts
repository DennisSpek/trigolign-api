import { Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Branch } from './branch.entity';

@Entity('organisations')
export class Organisation {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @OneToMany(() => Branch, branch => branch.name)
  branches!: Branch[];

  @CreateDateColumn()
  created_at!: string;
}