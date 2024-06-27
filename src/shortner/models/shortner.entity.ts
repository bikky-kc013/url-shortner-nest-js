import { User } from '../../user/models/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Shortner {
  @PrimaryColumn({
    type: 'varchar',
    length: 255,
  })
  id: string;
  @Column({
    type: 'text',
    nullable: false,
  })
  originalUrl: string;

  @Column({
    type: 'text',
    nullable: false,
  })
  shortenedUrl: string;

  @Column({
    type: 'int',
    default: 0,
  })
  clicks: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'userId' })
  user: User;
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
