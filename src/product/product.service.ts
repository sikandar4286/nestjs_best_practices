import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from './product.schema';
import { Model } from 'mongoose';

@Injectable()
export class ProductService {
  constructor(
    @InjectModel(Product.name, 'test') private ProductModel: Model<Product>,
  ) {}

  create(product) {
    const newProduct = new this.ProductModel(product);
    return newProduct.save();
  }

  findAll() {
    return this.ProductModel.find();
  }
}
