import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Measurement } from './measurement.entity';
import { Branch } from './branch.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Manufacturer, manufacturer => manufacturer.cars)
  @JoinColumn({ name: 'manufacturer_id' }) // Update column name and reference
  manufacturer!: Manufacturer;

  @OneToMany(() => Measurement, measurement => measurement.car)
  measurements!: Measurement[];

  @ManyToOne(() => Branch, branch => branch.cars)
  @JoinColumn({ name: 'branch_id' }) // Update column name and reference
  branch!: Branch;

  @Column()
  model!: string;

  @Column()
  suspension!: string;

  @Column({unique: true})
  registration!: string;
}
