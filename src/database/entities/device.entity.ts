import{ Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Branch } from './branch.entity';
import { Measurement } from './measurement.entity';


@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Branch, branch => branch.id)
  @JoinColumn({ name: 'branch_id' }) // Change column name and reference
  branch!: Branch;

  @OneToMany(() => Measurement, measurement => measurement.id)
  measurements!: Measurement[];

  @CreateDateColumn()
  created_at!: string;
}