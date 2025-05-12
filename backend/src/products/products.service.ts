import { Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  createNewProduct(createProductDto: CreateProductDto) {
    return this.productRepository.save(createProductDto);
  }

  getAllProducts() {
    return this.productRepository.find();
  }

  getProductById(id: number) {
    return this.productRepository.findOne({ where: { id } });
  }

  getProductByName(name: string) {
    return this.productRepository.findOne({ where: { name } });
  }

  updateProduct(id: number, updateProductDto: UpdateProductDto) {
    return this.productRepository.update(id, updateProductDto);
  }

  deleteProduct(id: number) {
    return this.productRepository.delete(id);
  }
}
