import { Entity, CreateDateColumn, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Device } from './device.entity';
import { Car } from './car.entity';

@Entity('groups')
export class Group {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @OneToMany(() => Device, device => device.id)
  devices!: Device[];

  @OneToMany(() => Car, car => car.registration)
  cars!: Car[];

  @CreateDateColumn()
  created_at!: string;
}