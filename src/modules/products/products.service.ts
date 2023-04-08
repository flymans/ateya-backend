import { Injectable, Inject, NotFoundException } from '@nestjs/common';
import { Product } from './products.model';

@Injectable()
export class ProductsService {
  constructor(
    @Inject('PRODUCTS_REPOSITORY')
    private productsRepository: typeof Product,
  ) {}

  async get(id: string): Promise<Product> {
    const product = await this.productsRepository.findOne<Product>({ where: { id } });
    if (!product) {
      throw new NotFoundException('Продукт не найден');
    }
    return product;
  }

  async create(product: Product): Promise<string> {
    const { id } = await this.productsRepository.create<Product>(product);
    return id;
  }

  async update(id: string, product: Product): Promise<string> {
    const productToUpdate = await this.productsRepository.findOne<Product>({ where: { id } });
    console.log({ productToUpdate, product });

    const previousValues = {
      ...(productToUpdate.pavilion !== product.pavilion && { pavilion: productToUpdate.pavilion }),
      ...(productToUpdate.responsible !== product.responsible && { responsible: productToUpdate.responsible }),
    };

    await productToUpdate.update({ ...product, previousValues: { ...product.previousValues, ...previousValues } });

    return id;
  }
}
