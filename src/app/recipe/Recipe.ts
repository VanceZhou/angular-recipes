export class Recipe {
    username: string;
    numberOfLikes: number;
    name: string;
    description: string ;
    category: string ;
    ingredients: Array<string>;
    directions: Array<string>;
    
   
    constructor(username: string, numberOfLikes: number, name: string, description: string, category: string, ingredients: Array<string>,  directions: Array<string>){
        this.username = username;
        this.numberOfLikes = numberOfLikes;
        this.name = name;
        this.description = description;
        this.category = category;
        this.ingredients = ingredients;
        this.directions = directions;
    }
}