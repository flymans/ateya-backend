import { Controller, Get, Post, Body, Param, Put } from '@nestjs/common';
import { ProductsService } from './products.service';
import { Product } from './products.model';

@Controller('products')
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

  @Put('/:id')
  async put(@Param('id') id, @Body() product: Product): Promise<string> {
    return this.productsService.update(id, product);
  }
}
