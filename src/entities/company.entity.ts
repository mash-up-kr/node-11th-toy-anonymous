import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Company {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ comment: '회사명' })
  name: string;

  @Column({ comment: '이메일 도메인 ex) naver.com ' })
  domain: string;

  /**
   * Timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @DeleteDateColumn()
  deletedAt: Date;

  /**
   * Relations
   */
  @OneToMany(() => User, (user) => user.company)
  users: User[];
}
