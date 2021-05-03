import {
  Column,
  Entity,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Cat } from './cat.entity';
import { Cattery } from '../../catteries/entities/cattery.entity';

@Entity()
export class Breed {
  @PrimaryGeneratedColumn()
  id: string;

  @Column({ unique: true })
  name: string;

  @Column({ nullable: true })
  description: string;

  @Column({ default: 'default' })
  image: string;

  @OneToMany(() => Cat, (cat) => cat.breed)
  cats: Cat[];

  @ManyToMany(() => Cattery, (cattery) => cattery.breeds)
  catteries: Cattery[];
}


