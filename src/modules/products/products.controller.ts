import { Controller, Get, Post, Body, Param } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('api/products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Get('/:id')
  async get(@Param('id') id): Promise<Product> {
    return this.productsService.get(id);
  }

  @Post()
  async create(@Body() product: Product): Promise<string> {
    return this.productsService.create(product);
  }
}
