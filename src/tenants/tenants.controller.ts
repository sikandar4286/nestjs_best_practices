import { Body, Controller, Get, Post } from '@nestjs/common';
import { TenantsService } from './tenants.service';

@Controller('tenants')
export class TenantsController {
  constructor(private readonly tenantsService: TenantsService) {}

  @Post()
  create(@Body() body: any) {
    return this.tenantsService.create(body);
  }
  @Get()
  getAll() {
    return this.tenantsService.getAll();
  }
}
