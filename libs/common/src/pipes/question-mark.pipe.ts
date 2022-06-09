import { Pipe, PipeTransform } from "@angular/core";

@Pipe({
    name: 'QuestionMark' 
  })
export class QuestionMarkPipe implements PipeTransform {

    transform(value: string, ...args: string[]): string {
      if(value){
        const lastCaractere = value[value.length-1];
        if(lastCaractere != "?"){
            value+=" ?";
        }
        return value;
      }
        return value;
    }
  
  }