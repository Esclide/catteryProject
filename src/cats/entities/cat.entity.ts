import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from '../../users/entities/user.entity';
import { Breed } from './breed.entity';
import { Exclude } from 'class-transformer';
import { Advertisement } from '../../advertisements/entities/advertisement.entity';

@Entity()
export class Cat {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({})
  name: string;

  @Column({ nullable: true })
  title: string;

  @Column({ enum: ['male', 'female'] })
  gender: string;

  @ManyToOne(() => User, (user) => user.bredCats, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  breeder: User;

  @ManyToOne(() => User, (user) => user.ownedCats, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  owner: User;

  @ManyToOne(() => Cat, (cat) => cat.motherChildren, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  mother: Cat;

  @OneToMany(() => Cat, (cat) => cat.mother)
  motherChildren: Cat[];

  @ManyToOne(() => Cat, (cat) => cat.fatherChildren, {
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  father: Cat;

  @OneToMany(() => Cat, (cat) => cat.mother)
  fatherChildren: Cat[];

  @ManyToOne(() => Breed, (breed) => breed.cats, {
    eager: true,
    nullable: true,
    onDelete: 'SET NULL',
    onUpdate: 'CASCADE',
  })
  breed: Breed;

  @Column({})
  color: string;

  @Column({})
  birthDate: Date;

  @Column({ default: true })
  abilityToReproduce: boolean;

  @Column({ nullable: true })
  description: string;

  @Column({ default: true })
  isAlive: boolean;

  @Column({ default: false })
  isDeleted: boolean;

  @Column({ nullable: true })
  @Exclude()
  deletionDate: Date;

  @ManyToMany(() => Advertisement, (advertisement) => advertisement.cats)
  advertisements: Advertisement[];
}
