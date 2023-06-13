import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Measurement } from './measurement.entity';
import { Group } from './group.entity';

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Manufacturer, manufacturer => manufacturer.cars)
  @JoinColumn({ name: 'manufacturer' }) // Change column name and reference
  manufacturer!: Manufacturer;

  @OneToMany(() => Measurement, measurement => measurement.id)
  measurements!: Measurement[];

  @ManyToOne(() => Group, group => group.id)
  @JoinColumn({ name: 'group' }) // Change column name and reference
  group!: Group;

  @Column()
  model!: string;

  @Column()
  suspension!: string;

  @Column({unique: true})
  registration!: string;
}
