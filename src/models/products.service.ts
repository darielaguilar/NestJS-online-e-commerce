import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './product.entity';
@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private productsRepository: Repository<Product>,
  ) {}

  findAll(): Promise<Product[]> {
    return this.productsRepository.find();
  }

  findByIds(ids: string[]) {
    return this.productsRepository.findByIds(ids);
  }
  findOne(id: any): Promise<Product> {
    return this.productsRepository.findOne({ where: { id } });
  }
  createOrUpdate(product: Product): Promise<Product> {
    return this.productsRepository.save(product);
  }
  async remove(id: string): Promise<void> {
    await this.productsRepository.delete(id);
  }
}
