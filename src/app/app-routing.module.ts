import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { SignupComponent } from './auth/signup/signup.component';
import { HomeComponent } from './home/home.component';
import { ProfileComponent } from './profile/profile.component';
import { PostComponent } from './recipe/post/post.component';
import { RecipeComponent } from './recipe/recipe.component';


const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'new', component: PostComponent},
  {path: 'profile', component: ProfileComponent},
  {path: 'sign-up', component: SignupComponent},
  {path: 'login', component:LoginComponent},
  
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [SignupComponent,LoginComponent,HomeComponent,RecipeComponent,PostComponent,ProfileComponent]
