import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'capitalizeFisrtLetter' 
  })
export class CapitalizeFirstLetterPipe implements PipeTransform {

    transform(value: string, ...args: string[]): string {
      const words = value.split(" ");
      let result = "";
        for(let i = 0; i < words.length; i++){
            result+= words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()+" ";
        }
      return result;
    }
  
  }