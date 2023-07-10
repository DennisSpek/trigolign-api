import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Measurement } from './measurement.entity';
import { Organisation } from './organisation.entity';

@Entity('token')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  organisation!: string;

  @Column()
  access_token!: string;

  @Column()
  refresh_token!: string;

  @Column()
  created_at!: string;
}
