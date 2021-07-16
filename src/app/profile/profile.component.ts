import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { AuthService } from '../auth/shared/auth.service';
import { Recipe } from '../recipe/Recipe';
import { RecipeService } from '../recipe/share/recipe.service';
import { User } from './user.payload';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  recipes$:Array<Recipe> = [];
  username = '';

  constructor(private authService:AuthService, private recipeService: RecipeService) {
    this.username = this.authService.getUsername();
    this.recipeService.getAllRecipes().subscribe(recipes =>{
      this.recipes$ = recipes;
      console.log(recipes[0]);
      console.log(this.recipes$[0]);
    });
   }
  

  ngOnInit(): void {
    
  }

}
