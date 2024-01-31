import{ Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from './car.entity';
import { Device } from './device.entity';
import { MeasurementSetting } from './measurement-settings.entity'

@Entity('measurement-toe')
export class MeasurementToe {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column('json')
  result!: JSON
}