import {
  Column,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cat } from './cat.entity';

const mediaFolder = '../media';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: `${mediaFolder}/default` })
  image: string;

  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[];
}
