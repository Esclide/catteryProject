import {
  Column,
  Entity, JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Breed } from '../../cats/entities/breed.entity';
import { User } from '../../users/entities/user.entity';

const advertisementType = ['sale', 'knitting'];
const advertisementLevels = ['general', 'cattery'];

@Entity()
export class Advertisement {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ enum: advertisementType })
  type: string;

  @Column({ enum: advertisementLevels })
  level: string;

  @Column({})
  title: string;

  @Column({})
  description: string;

  @ManyToMany(() => Breed, (breed) => breed.advertisements)
  @JoinTable()
  breeds: Breed[];

  @Column({})
  color: string;

  @ManyToOne(() => User, (user) => user.createdAdvertisements)
  creator: User;

  @Column({})
  price: number;

  @Column({})
  country: string;

  @Column({})
  city: string;

  @Column({ default: new Date() })
  creationDate: Date;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  deletionDate: Date;
}
