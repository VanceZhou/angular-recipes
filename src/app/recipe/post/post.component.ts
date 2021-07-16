import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Recipe } from '../Recipe';
import { RecipeService } from '../share/recipe.service';
import { PostRecipePayload } from './post-recipe.payload';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {
  postRecipePayload!:PostRecipePayload;
  recipeForm!:FormGroup;
  constructor(private recipeService:RecipeService) {
    this.postRecipePayload = {
    name: '',
    description: '',
    category: '',
    ingredients:[],
    directions:[]
    }
   }

  ngOnInit(): void {
    this.recipeForm = new FormGroup({
      name: new FormControl('',Validators.required),
      description:new FormControl('',Validators.required),
      category:new FormControl('',Validators.required),
      ingredients:new FormControl('',Validators.required),
      directions:new FormControl('',Validators.required)
    });
  }
  postRecipe(){
    this.postRecipePayload.name = this.recipeForm.get('name')?.value;
    this.postRecipePayload.description = this.recipeForm.get('description')?.value;
    this.postRecipePayload.category = this.recipeForm.get('category')?.value;
    this.postRecipePayload.ingredients = this.recipeForm.get('ingredients')?.value;
    this.postRecipePayload.directions = this.recipeForm.get('directions')?.value;
    
    this.recipeService.postRecipe(this.postRecipePayload).subscribe((response:Text) => {
      console.log(response);
    });
  }
  

}
