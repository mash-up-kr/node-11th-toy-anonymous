import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostService } from './post.service';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  async getAllPost() {
    return this.postService.findAll();
  }

  @Get(':id')
  async getPost(@Param('id') id: number) {
    return this.postService.findOne(id);
  }

  @Patch(':id')
  async updatePost(@Param('id') id: number, @Body() dto: UpdatePostDto) {
    return this.postService.findAndUpdate(id, dto);
  }

  @Post()
  async addPost(@Body() dto: CreatePostDto) {
    return this.postService.createPost(dto);
  }

  @Delete(':id')
  async deletePost(@Param('id') id: number) {
    return this.postService.deletePostById(id);
  }
}
