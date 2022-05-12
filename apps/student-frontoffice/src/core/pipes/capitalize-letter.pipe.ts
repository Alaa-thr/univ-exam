import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'capitalizeLetter' 
  })
export class CapitalizeLetterPipe implements PipeTransform {

    transform(value: string, ...args: string[]): string {
      if(value){
        const type = args[0];
        const words = value.split(" ");
        let result = "";
        for(let i = 0; i < words.length; i++){
          result+= words[i].charAt(0).toUpperCase() + words[i].slice(1).toLowerCase()+" ";
        }
        if(type == 'first'){
            return result;
        }else{
          return result.toUpperCase();
        }
        
      }
      return value;
    }
  
  }