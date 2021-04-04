import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Cattery } from './cattery.entity';

@Entity()
export class UserInCattery {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => User, (user) => user.catteries)
  user: User;

  @ManyToOne(() => Cattery, (cattery) => cattery.users)
  cattery: Cattery;

  @Column({ default: false })
  isAdmin: boolean;

  @Column({ default: false })
  isFeePaid: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column({ nullable: true })
  deletionDate: Date;
}
