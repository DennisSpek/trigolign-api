import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Measurement } from './measurement.entity';
import { Branch } from './branch.entity';
import { User } from './user.entity';
import { Suspension } from './suspension.entity'

@Entity('cars')
export class Car {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Manufacturer, manufacturer => manufacturer.cars)
  @JoinColumn({ name: 'manufacturer_name' }) // Update column name and reference
  manufacturer!: Manufacturer;

  @OneToMany(() => Measurement, measurement => measurement.car)
  @JoinColumn({ name: 'measurements' })
  measurements!: Measurement;

  @ManyToOne(() => Branch, branch => branch.cars)
  @JoinColumn({ name: 'branch_id' }) // Update column name and reference
  branch!: Branch;

  @ManyToOne(() => User, user => user.cars)
  @JoinColumn({ name: 'user_id' }) // Update column name and reference
  user!: User;

  @Column()
  model!: string;

  @OneToOne(() => Suspension, suspension => suspension.id)
  @JoinColumn({ name: 'suspension_id' })
  suspension!: Suspension;

  @Column({unique: true})
  registration!: string;

  @Column({ default: 0})
  custom!: boolean;

  @Column({default: null})
  mid!: string;
}
