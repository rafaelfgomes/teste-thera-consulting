import { Injectable, NotFoundException } from '@nestjs/common';
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

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async getProductByName(name: string) {
    const product = await this.productRepository.findOne({ where: { name } });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return product;
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productRepository.update(product, updateProductDto);
  }

  async deleteProduct(id: number) {
    const product = await this.productRepository.findOne({ where: { id } });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productRepository.delete(product);
  }
}
