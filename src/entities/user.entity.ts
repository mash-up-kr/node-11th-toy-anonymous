import { Post } from './post.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  Index,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Company } from './company.entity';
import { Comment } from './comment.entity';
import { CommentLike } from './comment-like.entity';
import { PostLike } from './post-like.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Index({ unique: true })
  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  nickName: string;

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
  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  @ManyToOne(() => Company, (company) => company.users)
  company: Company;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  @OneToMany(() => CommentLike, (commentLike) => commentLike.user)
  commentLikes: CommentLike[];

  @OneToMany(() => PostLike, (postLike) => postLike.user)
  postLikes: PostLike[];
}
