import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';

//@Injectable()
// export class DecimalPlacesPipe implements PipeTransform<any> {
//   transform(value: any, metadata: ArgumentMetadata) {
//     if (metadata.type === 'body' && typeof value === 'number') {
//       const decimalPlaces = (value.toString().split('.')[1] || []).length;
//       if (decimalPlaces <= 4) {
//         return value;
//       }
//     }
//     throw new BadRequestException(
//       'Number must have a maximum of 4 decimal places',
//     );
//   }
// }

@Injectable()
export class DecimalPlacesPipe implements PipeTransform<number> {
  transform(value: number) {
    const decimalPlaces = (value.toString().split('.')[1] || '').length;
    if (decimalPlaces <= 4) {
      return value;
    }
    throw new BadRequestException(
      'Number must have a maximum of 4 decimal places',
    );
  }
}
