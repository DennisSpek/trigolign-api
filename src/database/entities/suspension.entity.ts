import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Car } from './car.entity'

@Entity('suspensions')
export class Suspension {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: null })
  wheel_alignment_id!: string;

  @Column({ default: 'Custom' })
  wheel_alignment_description!: string;

  @Column()
  camber_front!: string;

  @Column()
  camber_back!: string;
}
