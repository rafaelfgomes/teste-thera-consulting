import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { ILike, Repository } from 'typeorm';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  getAllCategories() {
    return this.categoryRepository.find();
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({ where: { id } });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  async getCategoryByName(name: string) {
    const category = await this.categoryRepository.findOne({
      where: { name: ILike(`%${name}%`) },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return category;
  }

  createNewCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  async updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    const categoryUpdateData = {
      name: updateCategoryDto?.name,
    };

    const category = await this.categoryRepository.preload({
      id,
      ...categoryUpdateData,
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return this.categoryRepository.save(category);
  }

  async disableCategory(id: number) {
    const categoryDisableData = {
      active: false,
    };

    const category = await this.categoryRepository.preload({
      id,
      ...categoryDisableData,
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    return this.categoryRepository.save(category);
  }
}
