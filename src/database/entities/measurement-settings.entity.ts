import{ Entity, CreateDateColumn, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn, OneToOne } from 'typeorm';
import { Measurement } from './measurement.entity';

@Entity('measurement-settings')
export class MeasurementSetting {
  @PrimaryGeneratedColumn('uuid')
  id!: string;

  @Column({ default: null })
  toe_values_relative!: string;

  @Column({ default: null })
  basis_toe_measurement!: string;

  @Column({ default: null })
  show_item_first!: string;

  @Column({ default: null })
  camber_caster_value!: string;

  @Column({ default: null })
  wheelbase_left!: string;

  @Column({ default: null })
  wheelbase_right!: string;

  @Column({ default: null })
  distance_x!: string;

  @Column({ default: null })
  distance_x_y!: string;
}