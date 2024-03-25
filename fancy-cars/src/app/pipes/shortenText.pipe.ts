import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortenText',
})
export class ShortenTextPipe implements PipeTransform {
  transform(value: string, maxCharCount = 10): unknown {
    return `${value.slice(0, maxCharCount)}${
      value.length > maxCharCount ? '...' : ''
    }`;
  }
}
