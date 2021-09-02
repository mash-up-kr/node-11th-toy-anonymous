import {
  CreateDateColumn, Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn
} from 'typeorm';
import { Comment } from './comment.entity';
import { User } from './user.entity';

@Entity('comment_like')
export class CommentLike {
  @PrimaryGeneratedColumn()
  id: number;

  @OneToMany(() => Comment, (comment) => comment.user)
  comments: Comment[];

  /**
   * Timestamp
   */
  @CreateDateColumn()
  createdAt: Date;

  /**
   * Relation: Many to one
   */
  @ManyToOne(() => User, (user) => user.commentLikes)
  user: User;

  @ManyToOne(() => Comment, (comment) => comment.likes)
  comment: Comment;
}
