import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from '../../cats/entities/cat.entity';
import { Advertisement } from '../../advertisements/entities/advertisement.entity';
import { Exclude } from 'class-transformer';

const mediaFolder = '../media';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  email: string;

  @Column({})
  @Exclude()
  password: string;

  @Column({ unique: true })
  username: string;

  @Column({})
  firstName: string;

  @Column({ nullable: true })
  middleName: string;

  @Column({})
  lastName: string;

  @Column({})
  birthDate: Date;

  @Column({ default: new Date() })
  registrationDate: Date;

  @Column({ nullable: true })
  phone: string;

  @Column({ nullable: true })
  country: string;

  @Column({ nullable: true })
  city: string;

  @Column({ default: `${mediaFolder}/default` })
  image: string;

  @Column({ default: false })
  isDeleted: boolean;

  @Exclude()
  @Column({ nullable: true })
  deletionDate: Date;

  @OneToMany(() => Cat, (cat) => cat.breeder, { nullable: true })
  bredCats: Cat[];

  @OneToMany(() => Cat, (cat) => cat.breeder, { nullable: true })
  ownedCats: Cat[];

  @OneToMany(() => Advertisement, (advertisement) => advertisement.creator, {
    nullable: true,
  })
  createdAdvertisements: Advertisement[];
}
