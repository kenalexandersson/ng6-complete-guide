import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {ActivatedRoute} from '@angular/router';
import {Subject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();

  constructor(private shoppingListService: ShoppingListService, private route: ActivatedRoute) {
  }

  private recipes: Recipe[] = [
    new Recipe(
      1,
      'Tasty Schnitzel',
      'A super tasty schnitzel',
      'https://picsum.photos/800/450/?image=999',
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ),
    new Recipe(
      2,
      'Disgusting burger',
      'Jeez',
      'https://picsum.photos/800/450/?image=223',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Sad looking buns', 2),
        new Ingredient('Cheese', 1),
        new Ingredient('Bacon', 2),
        new Ingredient('Lettuce', 1)
      ]
    )
  ];

  setRecipes(recipes: Recipe[]) {
    this.recipes = recipes;
    this.recipesHasChanged();
  }

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

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesHasChanged();
  }

  updateRecipe(index: number, recipe: Recipe) {
    this.recipes[index] = recipe;
    this.recipesHasChanged();
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesHasChanged();
  }

  private recipesHasChanged() {
    this.recipesChanged.next(this.recipes.slice());
  }
}
