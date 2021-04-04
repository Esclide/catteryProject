import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Cattery } from './cattery.entity';

@Entity()
export class ApplicationToCattery {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.applications)
  user: User;

  @ManyToOne(() => Cattery, (cattery) => cattery.applications)
  cattery: Cattery;

  @Column({
    enum: ['approved', 'in progress', 'rejected'],
    default: 'in progress',
  })
  status: string;

  @Column({ nullable: true })
  message: string;

  @Column({ default: new Date() })
  applicationDate: Date;
}
