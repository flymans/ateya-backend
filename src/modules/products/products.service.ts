import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productsRepository: typeof Product,
  ) {}

  async get(id): Promise<Product> {
    const product = await this.productsRepository.findOne<Product>({
      where: { id: id },
    });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    return product;
  }

  async create(product): Promise<string> {
    const { id } = await this.productsRepository.create<Product>(product);
    return id;
  }
}
