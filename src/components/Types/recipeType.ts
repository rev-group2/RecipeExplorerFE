export interface RecipeType {
    uuid: string;
    recipeName: string;
    cuisine: string;
    category: string;
    instructions: string;
    recipeThumb: string;
    ingredients: string[];
    description?: string;
  }