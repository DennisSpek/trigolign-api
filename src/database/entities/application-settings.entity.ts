import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';

@Entity('application_settings')
export class Application_Settings {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: 'en' })
  language!: string;

  @Column({ default: 'mm' })
  length_unit!: string;

  @Column({ default: 'decimal' })
  degrees_unit!: string;

  @Column()
  percentage!: string;

  @Column({ default: 'Celsius' })
  temperature!: string;

  @Column({ default: 'bar' })
  airpressure!: string;
}
