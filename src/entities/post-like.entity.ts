import {
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Post } from './post.entity';
import { User } from './user.entity';

@Entity('post_like')
export class PostLike {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Post, (post) => post.user)
  posts: Post[];

  /**
   * Timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Relation: Many to one
   */
  @ManyToOne(() => User, (user) => user.postLikes)
  user: User;

  @ManyToOne(() => Post, (post) => post.likes)
  post: Post;
}
