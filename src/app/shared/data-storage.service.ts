import {Injectable} from '@angular/core';
import {RecipeService} from '../recipes/recipe.service';
import {Recipe} from '../recipes/recipe.model';
import {map} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class DataStorageService {

  constructor(private httpClient: HttpClient, private recipeService: RecipeService) {

  }

  fetchRecipes() {
    return this.httpClient.get<Recipe[]>('https://ng-recipe-book-b525d.firebaseio.com/recipes.json')
      .pipe(map((recipes) => {
        return recipes.map((recipe) => {
          if (!recipe['ingredients']) {
            recipe['ingredients'] = [];
          }

          return recipe;
        });
      }))
      .subscribe((recipes: Recipe[]) => {
          this.recipeService.setRecipes(recipes);
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  storeRecipes() {
    return this.httpClient.put('https://ng-recipe-book-b525d.firebaseio.com/recipes.json', this.recipeService.getRecipes());
  }
}
