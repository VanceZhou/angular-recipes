import { Component, OnInit } from '@angular/core';
import { OwlOptions, SlideModel } from 'ngx-owl-carousel-o';
import { Recipe } from '../recipe/Recipe';
import { RecipeService } from '../recipe/share/recipe.service';
import { slicePayLoad } from './slice.payload';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  recipes$:Array<Recipe> = [];
  title!:string;
  customOptions!: OwlOptions;
  slides:Array<slicePayLoad> = [];
  constructor(private recipeService: RecipeService ) {
    this.recipeService.getAllRecipes().subscribe(recipes =>{
      this.recipes$ = recipes;
      console.log(recipes[0]);
      console.log(this.recipes$[0]);
    });
  
   }
   


 

  ngOnInit(): void {
  this.title = 'recipes examples';
  
  this.customOptions = {
    
    loop: true,
    mouseDrag: true,
    touchDrag: false,
    pullDrag: true,
    dots: false,
    navSpeed: 700,
    navText: ['', ''],
    items:1,
    
    nav: true
  }
  
    this.slides = [
      {id: '1', img: "./assets/img/1.jpg"},
      {id: '2', img: "./assets/img/2.jpg"},
      {id: '3', img: "./assets/img/3.jpg"},
      {id: '4', img: "./assets/img/4.jpg"},
      
    ];
    
 
  }

}
