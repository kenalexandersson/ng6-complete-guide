import {Component, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {Ingredient} from '../../shared/ingredient.model';
import {Subscription} from 'rxjs';
import {NgForm} from '@angular/forms';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from '../store/shopping-list.actions';
import * as fromShoppingList from '../store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  @ViewChild('f') private shoppingListForm: NgForm;
  editMode = false;
  private startedEditing: Subscription;
  private editedItem: Ingredient;

  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.startedEditing = this.store.select('shoppingList').subscribe(
      data => {
        if (data.editedIngredientIndex > -1) {
          this.editedItem = data.editedIngredient;
          this.editMode = true;
          this.shoppingListForm.setValue({
            name: this.editedItem.name,
            amount: this.editedItem.amount
          });
        } else {
          this.editMode = false;
        }
      }
    );
  }

  onSubmitItem(form: HTMLFormElement) {
    const value = form.value;
    const newIngredient = new Ingredient(value.name, value.amount);

    if (this.editMode) {
      this.store.dispatch(new ShoppingListActions.UpdateIngredient({ingredient: newIngredient}));
      this.editMode = false;
    } else {
      this.store.dispatch(new ShoppingListActions.AddIngredient(newIngredient));
    }

    form.reset();
  }

  ngOnDestroy(): void {
    this.startedEditing.unsubscribe();
  }

  onCancel() {
    this.shoppingListForm.reset();
    this.editMode = false;
    // this.shoppingListService.stoppedEditing.next();
  }
}
