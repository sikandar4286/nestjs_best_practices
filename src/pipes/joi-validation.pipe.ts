import {
  ArgumentMetadata,
  BadRequestException,
  PipeTransform,
} from '@nestjs/common';
import errors from 'src/config/error-config';

export class JoiValidationPipe implements PipeTransform {
  constructor(private schema: any) {}
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, metadata, 'value, metadata');
    try {
      if (metadata.type === 'body') {
        const { error } = this.schema.body.validate(value);
        console.log(error, 'error_hello');
        if (error) throw new Error(error);
      }
    } catch (error) {
      console.log(error, 'error_JoiValidationPipe');
      throw new BadRequestException(errors.validationFailed);
    }

    return value;
  }
}
