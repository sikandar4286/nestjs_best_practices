import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { TenantMaster } from './tenant.schema';

@Injectable()
export class TenantsService {
  constructor(
    @InjectModel(TenantMaster.name, 'tenant')
    private TenantModal: Model<TenantMaster>,
  ) {}

  create(tenant) {
    const newtenant = new this.TenantModal(tenant);
    return newtenant.save();
  }

  async findOne(id: string) {
    const getTenant = await this.TenantModal.findOne({ name: id });

    return getTenant;
  }

  async getAll() {
    const getTenant = await this.TenantModal.find();

    return getTenant;
  }
}
