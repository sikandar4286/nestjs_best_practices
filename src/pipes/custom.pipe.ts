import {
  ArgumentMetadata,
  HttpException,
  HttpStatus,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import errors from 'src/config/error-config';

@Injectable()
export class CustomPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, 'value');
    console.log(metadata, 'metadata');

    // throw new HttpException(errors.validationFailed, HttpStatus.BAD_REQUEST);

    return value;
  }
}
