import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';
import { ProductResponseDto } from './dto/product-response.dto';
import { BaseResponse } from '@/common/dto/base-response.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async createNewProduct(createProductDto: CreateProductDto) {
    const productCreateData = {
      ...createProductDto,
      name: createProductDto.name,
      description: createProductDto.description,
      price: createProductDto.price,
      quantity: createProductDto.quantity,
      active: createProductDto?.active,
      category: { id: createProductDto.category_id },
    };

    return this.productRepository.save(productCreateData);
  }

  async getAllProducts(): Promise<BaseResponse<ProductResponseDto[]>> {
    const products = await this.productRepository.find({
      where: { active: true },
      relations: ['category'],
    });

    if (!products) {
      return new BaseResponse(
        [],
        'Nenhum produto encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const productResponseData = products.map((product) => ({
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      active: product.active,
      category: {
        name: product.category.name,
      },
    }));

    return new BaseResponse(productResponseData);
  }

  async getProductById(id: number) {
    const product = await this.productRepository.findOne({
      where: { id, active: true },
      relations: ['category'],
    });

    if (!product) {
      return new BaseResponse(
        [],
        'Produto não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    const responseData = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      active: product.active,
      category: {
        name: product.category.name,
      },
    };

    return new BaseResponse(responseData);
  }

  async updateProduct(id: number, updateProductDto: UpdateProductDto) {
    const productUpdateData = {
      name: updateProductDto?.name,
      description: updateProductDto?.description,
      price: updateProductDto?.price,
      category_id: updateProductDto?.category_id,
    };

    const product = await this.productRepository.preload({
      id,
      ...productUpdateData,
    });

    if (!product) {
      return new BaseResponse(
        [],
        'Produto não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.productRepository.save(product);

    const responseData = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      active: product.active,
      category: {
        name: product.category.name,
      },
    };

    return new BaseResponse(responseData);
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
      return new BaseResponse(
        [],
        'Produto não encontrado',
        HttpStatus.NOT_FOUND,
      );
    }

    await this.productRepository.save(product);

    const responseData = {
      id: product.id,
      name: product.name,
      description: product.description,
      price: product.price,
      quantity: product.quantity,
      active: product.active,
      category: {
        name: product.category.name,
      },
    };

    return new BaseResponse(responseData);
  }
}
