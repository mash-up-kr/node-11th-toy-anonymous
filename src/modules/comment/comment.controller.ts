import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { CommentService } from './comment.service';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Comment } from 'src/entities/comment.entity';

@Controller('comment')
export class CommentController {
  constructor(private readonly CommentService: CommentService) {}

  @Post()
  async createComment(@Body() dto: CreateCommentDto) {
    return this.CommentService.createComment(dto);
  }

  @Get()
  async getAll(@Query('postId') postId: number) {
    return this.CommentService.getAll(postId);
  }

  @Put(':id')
  async updateComment(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    return this.CommentService.findAndUpdate(id, dto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return this.CommentService.deleteCommentById(id);
  }
}
