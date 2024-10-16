import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema({ timestamps: true })
export class TenantMaster extends Document {
  @Prop({ isRequired: true })
  tenantId: string;

  @Prop({ isRequired: true })
  name: string;
}

export const TenantMasterSchema = SchemaFactory.createForClass(TenantMaster);
