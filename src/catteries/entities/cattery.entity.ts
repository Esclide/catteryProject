import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne, OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Breed } from '../../cats/entities/breed.entity';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { UserInCattery } from './user-in-cattery.entity';
import { ApplicationToCattery } from './application-to-cattery.entity';

@Entity()
export class Cattery {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({})
  name: string;

  @ManyToMany(() => Breed, (breed) => breed.catteries, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  @JoinTable()
  breeds: Breed[];

  @Column({ default: new Date() })
  registrationDate: Date;

  @Column()
  membershipFee: number;

  @ManyToOne(() => User, (user) => user.leadCatteries)
  leader: User;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ nullable: true })
  site: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column({ nullable: true })
  deletionDate: Date;

  @OneToMany(() => UserInCattery, (userInCattery) => userInCattery.cattery)
  users: UserInCattery[];

  @OneToMany(() => ApplicationToCattery, (applicationToCattery) => applicationToCattery.cattery)
  applications: UserInCattery[];
}
