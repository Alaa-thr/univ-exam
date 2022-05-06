import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'capitalizeFisrtLetter' 
  })
export class CapitalizeFirstLetterPipe implements PipeTransform {

    transform(value: string, ...args: string[]): string {
      return value.charAt(0).toUpperCase() + value.slice(1).toLowerCase();
    }
  
  }