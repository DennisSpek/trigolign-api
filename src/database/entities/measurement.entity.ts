import{ Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from './car.entity';
import { Device } from './device.entity';

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
}