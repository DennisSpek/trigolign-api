import{ Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from './car.entity';
import { Device } from './device.entity';
import { MeasurementSetting } from './measurement-settings.entity'

@Entity('measurements')
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Car, car => car.id)
  @JoinColumn({ name: 'car' }) // Change column name and reference
  car!: Car;

  @ManyToOne(() => Device, device => device.id)
  @JoinColumn({ name: 'device_id' }) // Change column name and reference
  device!: Device;

  @CreateDateColumn()
  created_at!: string;

  @OneToOne(() => MeasurementSetting, measurement => measurement.id)
  @JoinColumn({ name: 'settings' }) // Change column name and reference
  settings!: MeasurementSetting;

  @JoinColumn()
  front_left_toe!: string;

  @JoinColumn()
  front_right_toe!: string;

  @JoinColumn()
  back_left_toe!: string;

  @JoinColumn()
  back_right_toe!: string;

}