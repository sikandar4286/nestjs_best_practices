import { ArgumentMetadata, Injectable, PipeTransform } from '@nestjs/common';

@Injectable()
export class ToNumberPipe implements PipeTransform {
  transform(value: any, metadata: ArgumentMetadata) {
    console.log(value, 'value_pipe');
    console.log(metadata, 'metadata_pipe');
    return Number(value);
  }
}
