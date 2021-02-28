import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Exclude } from 'class-transformer';
import { Cat } from '../../cats/entities/cat.entity';
import { AdvertisementAttachments } from './advertisement-attachments.entity';

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

  @ManyToMany(() => Cat, (cat) => cat.advertisements, { eager: true })
  @JoinTable()
  cats: Cat[];

  @ManyToOne(() => User, (user) => user.createdAdvertisements, { eager: true })
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

  @Exclude()
  @Column({ nullable: true })
  deletionDate: Date;

  @OneToMany(
    () => AdvertisementAttachments,
    (advertisementAttachment) => advertisementAttachment.advertisement,
    { eager: true, nullable: true },
  )
  attachments: AdvertisementAttachments[];
}
