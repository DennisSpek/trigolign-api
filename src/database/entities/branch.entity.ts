import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn } from 'typeorm';
import { Measurement } from './measurement.entity';
import { Organisation } from './organisation.entity';
import { Employee } from './employee.entity';
import { User } from './user.entity'
import { Device } from './device.entity';
import { Car } from './car.entity';


@Entity('branches')
export class Branch {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @ManyToOne(() => Organisation, organisation => organisation.branches, {nullable: true})
  @JoinColumn({ name: 'organisation_id' }) // Update column name and reference
  organisation!: Organisation | null;

  @OneToMany(() => User, user => user.id)
  users!: User[];

  @OneToMany(() => Device, device => device.branch)
  devices!: Device[];

  @OneToMany(() => Car, car => car.branch)
  cars!: Car[];

  @OneToMany(() => Employee, employee => employee.id)
  employees!: Employee[];

  @OneToMany(() => Measurement, measurement => measurement.id)
  measurements!: Measurement[];
}
