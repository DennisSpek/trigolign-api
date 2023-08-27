import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Manufacturer } from './manufacturer.entity';
import { Measurement } from './measurement.entity';
import { Organisation } from './organisation.entity';
import { Branch } from './branch.entity';
import { Employee } from './employee.entity';
import { Car } from './car.entity';


@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column()
  name!: string;

  @Column()
  email!: string;

  @Column({ type: 'varchar', length: 255 })
  password!: string;

  @ManyToOne(() => Branch, branch => branch.users, { nullable: true })
  @JoinColumn({ name: 'branch_id' }) // Update column name and reference
  branch!: Branch | null;

  @OneToMany(() => Car, car => car.user)
  cars!: Car[];

  @OneToOne(() => Employee, employee => employee.id)
  @JoinColumn({ name: 'employee_id' }) // Update column name and reference
  employee!: Employee;

  @Column({default: 'client'})
  role!: string;

  @Column()
  token!: string;
}
