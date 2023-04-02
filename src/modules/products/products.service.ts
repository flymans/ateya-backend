import { Injectable, Inject } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productsRepository: typeof Product,
  ) {}

  async get(id): Promise<Product> {
    return this.productsRepository.findOne<Product>({ where: { id: id } });
  }

  async create(product): Promise<string> {
    const { id } = await this.productsRepository.create<Product>(product);
    return id;
  }
}
