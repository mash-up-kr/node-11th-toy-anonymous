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
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comment')
export class CommentController {
  constructor(private readonly commentService: CommentService) {}

  @Post()
  async createComment(@Body() dto: CreateCommentDto) {
    return this.commentService.createComment(dto);
  }

  @Get()
  async getAll(@Query('postId') postId: number) {
    return this.commentService.getAll(postId);
  }

  @Put(':id')
  async updateComment(@Param('id') id: number, @Body() dto: UpdateCommentDto) {
    return this.commentService.findAndUpdate(id, dto);
  }

  @Delete(':id')
  async deleteComment(@Param('id') id: number) {
    return this.commentService.deleteCommentById(id);
  }
}
