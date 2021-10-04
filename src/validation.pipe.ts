import {
  ArgumentMetadata,
  Injectable,
  PipeTransform,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { ObjectSchema } from 'yup';

@Injectable()
export class ValidationPipe implements PipeTransform {
  constructor(private schema: ObjectSchema<any>) {}

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, _metadata: ArgumentMetadata) {
    let isValid = true;
    const error = await this.schema
      .validate(value, {
        abortEarly: false,
      })
      .catch((e) => {
        isValid = false;
        return e;
      });
    if (!isValid) {
      const array = error.inner.map((err: any) => ({
        message: err.errors[0],
        label: err.path,
        type: err.type,
      }));
      throw new HttpException(array, HttpStatus.UNPROCESSABLE_ENTITY);
    }
    return value;
  }
}

@Injectable()
export class ValidationNumberPipe implements PipeTransform {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  async transform(value: any, _metadata: ArgumentMetadata) {
    const isValid = Number(value);
    if (isNaN(isValid)) {
      throw new HttpException(
        { erro: 'Paramétro inválido' },
        HttpStatus.BAD_REQUEST,
      );
    }
    return value;
  }
}
