import { Component, OnInit } from '@angular/core';
import {ingredient } from '../shared/ingredient.model'

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
ingredients :ingredient [] = [
  new ingredient('mangoes',500),
  new ingredient('apples',800),
  new ingredient('tomatoes',200)
];
  constructor() { }

  ngOnInit(): void {
  }

}
