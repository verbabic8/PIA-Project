import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filtrer'
})
export class FiltrerPipe implements PipeTransform {

  transform(items: any[], field: string, value: string): any[] {
    if (!items) {
      return [];
    }
    if (!value || value.length === 0) {
      return items;
    }
    return items.filter(item => item[field]?.toString().toLowerCase().includes(value.toLowerCase()));
  }
}
