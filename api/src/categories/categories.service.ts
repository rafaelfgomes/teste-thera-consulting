import { HttpStatus, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { BaseResponse } from '@/common/dto/base-response.dto';
import { CategoryResponseDto } from './dto/category-response.dto';

@Injectable()
export class CategoriesService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  async getAllCategories(): Promise<BaseResponse<CategoryResponseDto[]>> {
    const categories = await this.categoryRepository.find({
      where: { active: true },
    });

    if (!categories) {
      return new BaseResponse(
        [],
        'Nenhuma categoria encontrada',
        HttpStatus.NOT_FOUND,
      );
    }

    const responseData = categories.map((category) => ({
      id: category.id,
      name: category.name,
    }));

    return new BaseResponse(responseData);
  }

  async getCategoryById(id: number) {
    const category = await this.categoryRepository.findOne({
      where: { id, active: true },
    });

    if (!category) {
      throw new NotFoundException('Categoria não encontrada');
    }

    const responseData = {
      id: category.id,
      name: category.name,
    };

    return new BaseResponse(responseData);
  }

  createNewCategory(createCategoryDto: CreateCategoryDto) {
    const categoryCreateData = {
      name: createCategoryDto.name,
    };

    return this.categoryRepository.save(categoryCreateData);
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
