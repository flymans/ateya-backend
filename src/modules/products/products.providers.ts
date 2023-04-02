import { Product } from './products.model';

export const productsProviders = [
  {
    provide: 'PRODUCTS_REPOSITORY',
    useValue: Product,
  },
];
