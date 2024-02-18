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
  camber_unit!: string;

  @Column({ default: null })
  toe_unit!: string;

  @Column({ default: null })
  wheelbase_left!: string;

  @Column({ default: null })
  wheelbase_right!: string;

  @Column({ default: null })
  distance_x!: string;

  @Column({ default: null })
  distance_x_y!: string;

  @Column({ default: null })
  toe_front_left_front!: string;

  @Column({ default: null })
  toe_front_left_back!: string;

  @Column({ default: null })
  toe_front_right_front!: string;

  @Column({ default: null })
  toe_front_right_back!: string;

  @Column({ default: null })
  toe_back_left_front!: string;

  @Column({ default: null })
  toe_back_left_back!: string;

  @Column({ default: null })
  toe_back_right_front!: string;

  @Column({ default: null })
  toe_back_right_back!: string;
}