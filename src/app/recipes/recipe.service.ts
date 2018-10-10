import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) {
  }

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Schnitzel',
      'A super tasty schnitzel',
      'https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      2,
      'Disgusting burger',
      'Jeez',
      'https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Sad looking buns', 2),
        new Ingredient('Cheese', 1),
        new Ingredient('Bacon', 2),
        new Ingredient('Lettuce', 1)
      ]
    )
  ];

  getRecipes() {
    // This returns a copy, not a reference so that the recipes array doesn't get
    // accidentally modified outside of this class
    return this.recipes.slice();
  }

  getRecipe(index: number) {
    // const recipe = this.recipes.find(
    //   (r) => {
    //     return r.id === id;
    //   }
    // );

    return this.recipes[index];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }
}
