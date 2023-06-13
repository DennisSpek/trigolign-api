import{ Entity, CreateDateColumn, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Group } from './group.entity';

@Entity('devices')
export class Device {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @ManyToOne(() => Group, group => group.id)
  @JoinColumn({ name: 'group' }) // Change column name and reference
  group!: Group;

  @CreateDateColumn()
  created_at!: string;
}