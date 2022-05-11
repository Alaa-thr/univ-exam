import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'SeparateWords' 
  })
export class SeparateWordsPipe implements PipeTransform {

    transform(value: string, ...args: string[]): string {
        const words = value.split("_");
        let result = "";
        for(let i = 0; i < words.length; i++){
            result+= words[i]+" ";
        }
      return result;
    }
  
  }