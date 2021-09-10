import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from 'src/entities/category.entity';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/create-category.dto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async create({ name }: CreateCategoryDto): Promise<Category> {
    const category = await this.categoryRepository.findOne({
      where: { name },
      relations: ['posts'],
    });
    if (category !== undefined) {
      return category;
    }
    return await this.categoryRepository.save({ name });
  }

  async findAll(): Promise<Category[]> {
    return await this.categoryRepository.find();
  }

  async findOne(id: number): Promise<Category> {
    const category = await this.categoryRepository.findOne(id, {
      relations: ['posts'],
    });
    if (category === undefined) {
      throw new NotFoundException();
    }
    return category;
  }

  async updateName(id: number, name: string): Promise<Category> {
    const category = await this.categoryRepository.findOne(id);
    if (category === undefined) {
      throw new NotFoundException();
    }
    category.name = name;
    return await this.categoryRepository.save(category);
  }

  async deleteById(id: number): Promise<void> {
    const category = await this.categoryRepository.findOne(id);
    if (category === undefined) {
      throw new NotFoundException();
    }
    await this.categoryRepository.delete(id);
  }
}
