export type RecipeType = {
    authorUuid: string
    category: string
    creationDate: number
    cuisine: string
    description: string | null
    ingredients: Array<string>
    instructions: string
    recipeName: string
    recipeThumb: string
    type: string
    uuid: string
}
