import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Tag } from 'src/entities/tag.entity';
import { Repository } from 'typeorm';
import { TagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Injectable()
export class TagService {
  constructor(
    @InjectRepository(Tag)
    private readonly tagRepository: Repository<Tag>,
  ) {}

  async deleteById(id: number): Promise<void> {
    const tag = await this.findById(id);
    if (tag) {
      await this.tagRepository.delete(id);
    }
  }
  async findAndUpdate(id: number, dto: UpdateTagDto) {
    const tag = await this.findById(id);
    if (tag) {
      return await this.tagRepository.update(id, dto);
    }
  }
  async create({ name }: TagDto): Promise<Tag> {
    return await this.tagRepository.save({ name });
  }
  async findById(id: number): Promise<Tag> {
    const tag = await this.tagRepository.findOne(id);
    if (!tag) {
      throw new NotFoundException();
    }
    return tag;
  }
  async findAll(): Promise<Tag[]> {
    return await this.tagRepository.find();
  }
  async findByName(name: string) {
    return await this.tagRepository.findOne({
      where: { name },
    });
  }
  async findOrCreateByNameList(tags: string[]): Promise<Tag[]> {
    return await Promise.all(
      tags.map(async (tag) => await this.findOrCreateByName(tag)),
    );
  }
  private async findOrCreateByName(name: string): Promise<Tag> {
    const tag = await this.findByName(name);
    if (tag) {
      return tag;
    }
    return await this.create({ name });
  }
}
