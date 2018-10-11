import {Pipe, PipeTransform} from '@angular/core';
import {Recipe} from '../recipe.model';

@Pipe({
  name: 'recipeFilter'
  // adding pure: false here will allow the filter to rerun everytime something changes in page, with eventual performance issues
})
export class RecipeFilterPipe implements PipeTransform {

  transform(value: Recipe[], filterString: string): any {
    if (value.length === 0 || filterString === null || filterString === '') {
      return value;
    }

    return value.filter(
      (recipe: Recipe) => {
        return recipe.name.toLowerCase().includes(filterString.toLowerCase());
      }
    );
  }

}
