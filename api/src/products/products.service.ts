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
    const productUpdateData = {
      name: updateProductDto?.name,
      description: updateProductDto?.description,
      price: updateProductDto?.price,
      active: updateProductDto?.active,
      category_id: updateProductDto?.category_id,
    };

    const product = await this.productRepository.preload({
      id,
      ...productUpdateData,
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productRepository.save(product);
  }

  async disableProduct(id: number) {
    const productDisableData = {
      active: false,
    };

    const product = await this.productRepository.preload({
      id,
      ...productDisableData,
    });

    if (!product) {
      throw new NotFoundException('Produto não encontrado');
    }

    return this.productRepository.save(product);
  }
}
