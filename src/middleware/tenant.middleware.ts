import {
  BadRequestException,
  HttpException,
  HttpStatus,
  Injectable,
  NestMiddleware,
  NotFoundException,
} from '@nestjs/common';
import { Request, Response } from 'express';
import { TenantsService } from 'src/tenants/tenants.service';

@Injectable()
export class TenantMiddleWare implements NestMiddleware {
  constructor(private tenantsService: TenantsService) {}

  async use(req: Request, res: Response, next: (error?: Error | any) => void) {
    const tenantId = req.headers['x-tenant-id']?.toString();

    if (!tenantId) {
      throw new BadRequestException('x-tenant-id not provided');
    }

    const getTenant = await this.tenantsService.findOne(tenantId);

    if (!getTenant) {
      console.log('!getTenant');
      throw new NotFoundException('x-tenant-id not found');
    }

    req['tenantId'] = tenantId;
    next();
  }
}
