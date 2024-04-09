import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, OneToOne } from 'typeorm';
import { Car } from './car.entity'

/**
 * Represents a Suspension entity.
 */
@Entity('suspensions')
export class Suspension {
  /**
   * The unique identifier of the suspension.
   */
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  /**
   * The wheel alignment ID associated with the suspension.
   */
  @Column({ default: null })
  wheel_alignment_id!: string;

  /**
   * The description of the wheel alignment associated with the suspension.
   */
  @Column({ default: 'Custom' })
  wheel_alignment_description!: string;

  /**
   * The camber values of the suspension.
   */
  @Column('json')
  camber!: string;

  /**
   * The toe values of the suspension.
   */
  @Column('json')
  toe!: string;
}
