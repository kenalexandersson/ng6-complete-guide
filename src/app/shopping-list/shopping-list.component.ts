import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {Observable, Subscription} from 'rxjs';
import {Store} from '@ngrx/store';
import * as ShoppingListActions from './store/shopping-list.actions';
import * as fromShoppingList from './store/shopping-list.reducers';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {

  shoppingListState: Observable<{ingredients: Ingredient[]}>;

  private stoppedEditing: Subscription;
  editMode = false;

  constructor(private store: Store<fromShoppingList.AppState>) {
  }

  ngOnInit() {
    this.shoppingListState = this.store.select('shoppingList');

    // this.stoppedEditing = this.shoppingListService.stoppedEditing.subscribe(
    //   () => {
    //     this.editMode = false;
    //   }
    // );
  }

  ngOnDestroy(): void {
    // this.stoppedEditing.unsubscribe();
  }

  onEditItem(index: number) {
    this.store.dispatch(new ShoppingListActions.StartEdit(index));
    this.editMode = true;
  }

  onDeleteItem(index: number) {
    this.store.dispatch(new ShoppingListActions.DeleteIngredient(index));
  }
}
