import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import {Advertisement} from "./advertisement.entity";

@Entity()
export class AdvertisementAttachments {
  @PrimaryGeneratedColumn()
  id: string;

  @ManyToOne(() => Advertisement, (advertisement) => advertisement.attachments)
  advertisement: Advertisement;

  @Column()
  path: string;

  @Column({ default: false })
  isMainPhoto: boolean;
}
