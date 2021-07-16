import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { AuthService } from 'src/app/auth/shared/auth.service';
import { ProfileComponent } from 'src/app/profile/profile.component';
import { PostRecipePayload } from '../post/post-recipe.payload';
import { Recipe } from '../Recipe';



@Injectable({
  providedIn: 'root'
})
export class RecipeService {

  constructor(private http: HttpClient, private authServive: AuthService) { }

  getAllRecipes():Observable<Array<Recipe>>{
    return this.http.get<Array<Recipe>>('http://localhost:8080/api/recipe/all');
  }
  getRecipesByUsername():Observable<Array<Recipe>>{
    const username = this.authServive.getUsername();
    return this.http.get<Array<Recipe>>('http://localhost:8080/api/recipe/profile/'+ username);
  }
  postRecipe(postRecipePayload:PostRecipePayload):Observable<any>{
    return this.http.post('http://localhost:8080/api/recipe/new', postRecipePayload, {responseType: 'text'});
  }
  
}
