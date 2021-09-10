import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Post } from '../../entities/post.entity';
import { Category } from '../../entities/category.entity';
import { User } from '../../entities/user.entity';
import { Tag } from '../../entities/tag.entity';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
@Injectable()
export class PostService {
  constructor(
    @InjectRepository(Post)
    private postRepository: Repository<Post>,
    @InjectRepository(Category)
    private categoryRepository: Repository<Category>,
    @InjectRepository(User)
    private userRepository: Repository<User>,
    @InjectRepository(Tag)
    private tagRepository: Repository<Tag>,
  ) {}

  async findOne(id: number): Promise<Post> {
    const post = await this.postRepository.findOne(id, {
      relations: ['category', 'tags'],
    });
    if (post === undefined) {
      throw new NotFoundException();
    }
    return post;
  }

  async findAll(): Promise<Post[]> {
    const posts = await this.postRepository.find({
      relations: ['category', 'tags'],
    });
    return posts;
  }

  async findAndUpdate(
    id: number,
    { title, content, categoryId, tags: dtoTags }: UpdatePostDto,
  ): Promise<Post> {
    const post = await this.findOne(id);
    const category = await this.categoryRepository.findOne(categoryId);
    if (category === undefined) {
      throw new NotFoundException(`Category id ${categoryId} is not found`);
    }
    const tags = dtoTags
      ? await Promise.all(dtoTags.map((tag) => this.findOrCreateTag(tag)))
      : undefined;
    return await this.postRepository.save({
      ...post,
      title,
      content,
      category,
      tags,
    });
  }

  async updatePostCount(id: number): Promise<Post> {
    const post = await this.findOne(id);
    post.viewCount += 1;
    return await this.postRepository.save(post);
  }

  async createPost({
    title,
    content,
    userId,
    categoryId,
    tags: dtoTags,
  }: CreatePostDto): Promise<Post> {
    const category = await this.categoryRepository.findOne(categoryId);
    if (category === undefined) {
      throw new NotFoundException(`Category id ${categoryId} is not found`);
    }
    const user = await this.userRepository.findOne(userId);
    if (user === undefined) {
      throw new NotFoundException(`User id ${userId} is not found`);
    }
    // TODO (jiyoung.lim): Replace to tag provider's method when tag providers is created.
    const tags = dtoTags
      ? await Promise.all(dtoTags.map((tag) => this.findOrCreateTag(tag)))
      : undefined;
    const post = this.postRepository.create({
      title,
      content,
      user,
      category,
      tags,
    });
    return await this.postRepository.save(post);
  }

  async deletePostById(id: number): Promise<void> {
    await this.postRepository.delete(id);
  }

  async findOrCreateTag(tagName: string): Promise<Tag> {
    const tag = await this.tagRepository.findOne({ name: tagName });
    if (tag !== undefined) {
      return tag;
    }
    const newTag = this.tagRepository.create({ name: tagName });
    return await this.tagRepository.save(newTag);
  }
}
