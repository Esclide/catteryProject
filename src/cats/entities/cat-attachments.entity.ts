import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Cat } from './cat.entity';

@Entity()
export class CatAttachments {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Cat, (cat) => cat.attachments, { onDelete: 'SET NULL', onUpdate: 'CASCADE'})
  cat: Cat;

  @Column()
  path: string;

  @Column({ default: false })
  isMainPhoto: boolean;
}
