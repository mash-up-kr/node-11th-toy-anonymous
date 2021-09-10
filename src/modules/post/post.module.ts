import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Post } from '../../entities/post.entity';
import { Category } from '../../entities/category.entity';
import { User } from '../../entities/user.entity';
import { Tag } from '../../entities/tag.entity';
import { PostController } from './post.controller';
import { PostService } from './post.service';

@Module({
  imports: [TypeOrmModule.forFeature([Post, Category, User, Tag])],
  controllers: [PostController],
  providers: [PostService],
})
export class PostModule {}
