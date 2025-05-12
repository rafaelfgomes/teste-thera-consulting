import { Injectable } from '@nestjs/common';
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

  createNewCategory(createCategoryDto: CreateCategoryDto) {
    return this.categoryRepository.save(createCategoryDto);
  }

  getAllCategories() {
    return this.categoryRepository.find();
  }

  getCategoryById(id: number) {
    return this.categoryRepository.findOne({ where: { id } });
  }

  getCategoryByName(name: string) {
    return this.categoryRepository.findOne({
      where: { name: ILike(`%${name}%`) },
    });
  }

  updateCategory(id: number, updateCategoryDto: UpdateCategoryDto) {
    return this.categoryRepository.update(id, updateCategoryDto);
  }

  removeCategory(id: number) {
    return this.categoryRepository.delete(id);
  }
}
