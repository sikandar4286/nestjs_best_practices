import { Injectable } from '@nestjs/common';
import { CreateCustomerDto } from './dto/create-customer.dto';
import { UpdateCustomerDto } from './dto/update-customer.dto';
import { InjectModel } from '@nestjs/mongoose';
import { Product } from 'src/product/product.schema';
import { Model } from 'mongoose';

@Injectable()
export class CustomerService {
  constructor(
    @InjectModel(Product.name, 'test') private ProductSchema: Model<Product>,
  ) {}

  create(createCustomerDto: CreateCustomerDto) {
    console.log(createCustomerDto, 'createCustomerDto');
    return 'This action adds a new customer';
  }

  findAll() {
    return `This action returns all customer hello`;
    // return [];
  }

  findAllProduct() {
    return this.ProductSchema.find();
    // return `This action returns all customer hello`;
    // return [];
  }

  findOne(id: number) {
    return `This action returns a #${id} customer`;
  }

  update(id: number, updateCustomerDto: UpdateCustomerDto) {
    return `This action updates a #${id} customer`;
  }

  remove(id: number) {
    return `This action removes a #${id} customer`;
  }
}
