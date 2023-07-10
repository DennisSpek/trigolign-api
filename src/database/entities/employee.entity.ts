import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Measurement } from './measurement.entity';
import { Organisation } from './organisation.entity';
import { Branch } from './branch.entity'

@Entity('employees')
export class Employee {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  organisation!: string;

  @ManyToOne(() => Branch, branch => branch.id)
  @JoinColumn({ name: 'branch_id' }) // Update column name and reference
  branch!: Branch;

  @Column()
  measurements!: string;
}
