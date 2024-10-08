import{ Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, OneToOne, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from './car.entity';
import { Device } from './device.entity';
import { MeasurementSetting } from './measurement-settings.entity'
import { MeasurementToe } from './measurement-toe.entity'
import { MeasurementCamber } from './measurement-camber.entity'

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

  @OneToOne(() => MeasurementSetting, setting => setting.id)
  @JoinColumn({ name: 'settings' }) // Change column name and reference
  settings!: MeasurementSetting;

  @OneToOne(() => MeasurementToe, toe => toe.id, {nullable: true})
  @JoinColumn({ name: 'toe' }) // Change column name and reference
  toe!: MeasurementToe | null;
  
  @OneToOne(() => MeasurementCamber, camber => camber.id, {nullable: true})
  @JoinColumn({ name: 'camber' }) // Change column name and reference
  camber!: MeasurementCamber | null;
}