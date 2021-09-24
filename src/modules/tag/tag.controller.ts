import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { TagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';
import { TagService } from './tag.service';

@Controller('tag')
export class TagController {
  constructor(private readonly tagService: TagService) {}

  @Get()
  async getAllTags() {
    return this.tagService.findAll();
  }

  @Get(':id')
  async getTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.findById(id);
  }

  @Post()
  async addTag(@Body() data: TagDto) {
    return this.tagService.create(data);
  }

  @Patch(':id')
  async updateTag(
    @Param('id', ParseIntPipe) id: number,
    @Body() dto: UpdateTagDto,
  ) {
    return this.tagService.findAndUpdate(id, dto);
  }

  @Delete(':id')
  async deleteTag(@Param('id', ParseIntPipe) id: number) {
    return this.tagService.deleteById(id);
  }
}
