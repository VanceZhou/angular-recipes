export interface PostRecipePayload {
    name: string;
    description: string;
    category: string;
    ingredients:Array<string>;
    directions:Array<string>;

}