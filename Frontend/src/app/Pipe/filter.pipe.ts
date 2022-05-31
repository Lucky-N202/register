import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'filterUsers'
})
export class FilterPipe implements PipeTransform {

  transform(userLists:any[],filterText: string){
    
     if(filterText.trim() === '')
     {
        return userLists; 
     }
      else 
      {
         return userLists.filter((user) =>
         {return user.role_id.toLowerCase() === filterText.toLowerCase()})
      }
  }

}
