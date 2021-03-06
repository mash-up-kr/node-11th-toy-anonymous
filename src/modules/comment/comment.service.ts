import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { User } from '../../entities/user.entity';
import { Comment } from '../../entities/comment.entity';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Injectable()
export class CommentService {
  constructor(
    @InjectRepository(Comment)
    private CommentRepository: Repository<Comment>,
    @InjectRepository(Post)
    private PostRepository: Repository<Post>,
    @InjectRepository(User)
    private UserRepository: Repository<User>,
  ) {}

  async createComment(commentData: CreateCommentDto): Promise<Comment> {
    const { postId, userId, content } = commentData;
    const post = await this.PostRepository.findOne(postId);
    if (post == null) {
      throw new NotFoundException();
    }
    const user = await this.UserRepository.findOne(userId);
    if (user === undefined) {
      throw new NotFoundException();
    }
    const comment = this.CommentRepository.create({ post, user, content });
    return await this.CommentRepository.save(comment);
  }

  async getAll(postId: number): Promise<Comment[]> {
    const post = await this.PostRepository.findOne(postId);
    const comments = await this.CommentRepository.find({ post: post });
    return comments;
  }

  async findOne(id: number): Promise<Comment> {
    const comment = await this.CommentRepository.findOne(id);
    if (comment == null) {
      throw new NotFoundException();
    }
    return comment;
  }

  async findAndUpdate(
    id: number,
    { content }: UpdateCommentDto,
  ): Promise<Comment> {
    const comment = await this.findOne(id);
    comment.content = content;
    return await this.CommentRepository.save(comment);
  }

  async deleteCommentById(id: number): Promise<void> {
    await this.CommentRepository.delete(id);
    return;
  }
}
