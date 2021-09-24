import { Module } from '@nestjs/common';
import { CommentController } from './comment.controller';
import { CommentService } from './comment.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';
import { Comment } from '../../entities/comment.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Comment, Post, User])],
  controllers: [CommentController],
  providers: [CommentService],
})
export class CommentModule {}
