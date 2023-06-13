import{ Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Car } from './car.entity';

@Entity('measurements')
export class Measurement {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Car, car => car.id)
  @JoinColumn({ name: 'car' }) // Change column name and reference
  car!: Car;

  @CreateDateColumn()
  created_at!: string;
}