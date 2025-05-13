import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Post()
  createNewCategory(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoriesService.createNewCategory(createCategoryDto);
  }

  @Get()
  getAllCategories() {
    return this.categoriesService.getAllCategories();
  }

  @Get(':id')
  getCategoryById(@Param('id') id: string) {
    return this.categoriesService.getCategoryById(+id);
  }

  @Get('/by-name/:name')
  getCategoryByName(@Param('name') name: string) {
    return this.categoriesService.getCategoryByName(name);
  }

  @Patch(':id')
  updateCategory(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoriesService.updateCategory(+id, updateCategoryDto);
  }

  @Delete(':id')
  removeCategory(@Param('id') id: string) {
    return this.categoriesService.removeCategory(+id);
  }
}
