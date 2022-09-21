import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'userfilter'
})
export class UserfilterPipe implements PipeTransform {

  transform(value: unknown, ...args: unknown[]): unknown {
    return null;
  }

}
