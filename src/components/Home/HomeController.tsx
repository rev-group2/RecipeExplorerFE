import React, { useEffect, useState } from 'react';
import HomeView from './HomeView';
import config from '../../config';
import { RecipeType } from '../Types/recipeType';
import { Meal } from '../Types/mealType';
import { CommentType } from '../Types/commentType';
const URL = `${config.path}`;

function HomeController() {
  const [recipes, setRecipes] = useState<RecipeType[] | undefined>(undefined);
  const [randIndex, setRandIndex] = useState<number>(0);
  const [recipeComments, setRecipeComments] = useState<CommentType[] | undefined>(undefined);
  const [recipeRating, setRecipeRating] = useState<string>("No rating");
  
  async function getRandRecipe(recipesArr: RecipeType[] | undefined) {
    try {
      const responseRand = await fetch("https://www.themealdb.com/api/json/v1/1/random.php");
      const dataRand = await responseRand.json();
      
      const randRecipe = transformMealData(dataRand);
      combineRecipes(randRecipe, recipesArr);
    } catch(err) {
      console.error(err)
    }
  }

  async function getRecipeComments(recipeId: string | undefined) {
    try {
      const responseComments = await fetch(`${URL}/comments/recipe/?recipe=${recipeId}`);
      const dataComments = await responseComments.json();
    
      setRecipeComments(dataComments);
      calculateRecipeRating(dataComments);
    } catch(err) {
      console.error(err)
    }
  }

  function calculateRecipeRating(comments: CommentType[]) {
    const recipeRatings = comments.map(rating => {
      return rating.rating;
    })

    if (recipeRatings.length) {
      const sumRatings = recipeRatings.reduce((prevVal, currVal) => {
        return prevVal + currVal;
      }, 0);

      let ratingAvg; 

      if ((sumRatings / recipeRatings.length) % 1 !== 0) {
        ratingAvg = (sumRatings / recipeRatings.length).toFixed(1);
      } else {
        ratingAvg = sumRatings / recipeRatings.length;
      }
      
      setRecipeRating(`${ratingAvg}`);
    } else {
      setRecipeRating("No rating");
    }
  }
  
  function combineRecipes(randRecipe: RecipeType[], recipesArr: RecipeType[] | undefined) {
    if (recipesArr) {
      const combinedRecipes = [...recipesArr, ...randRecipe];
      
      randomIndex(combinedRecipes);
      setRecipes(combinedRecipes);
    } else {
      setRecipes(randRecipe);
    }
  }
  
  async function randomIndex(recipesArr: RecipeType[]) {
    try {
      const randRecipeIndex = Math.floor(Math.random() * recipesArr.length);
      setRandIndex(randRecipeIndex);
  
      await getRecipeComments(recipesArr[randRecipeIndex].uuid);
    } catch(err) {
      console.error(err)
    }
  }
  
  function transformMealData(randRecipe: Meal): RecipeType[] {
    return randRecipe.meals.map((recipe) => ({
      type: "recipe",
      uuid: recipe.idMeal,
      recipeName: recipe.strMeal,
      cuisine: recipe.strArea,
      category: recipe.strCategory,
      instructions: recipe.strInstructions,
      recipeThumb: recipe.strMealThumb,
      ingredients: [
        recipe.strIngredient1,
        recipe.strIngredient2,
        recipe.strIngredient3,
        recipe.strIngredient4,
        recipe.strIngredient5,
        recipe.strIngredient6,
        recipe.strIngredient7,
        recipe.strIngredient8,
        recipe.strIngredient9,
        recipe.strIngredient10,
        recipe.strIngredient11,
        recipe.strIngredient12,
        recipe.strIngredient13,
        recipe.strIngredient14,
        recipe.strIngredient15,
        recipe.strIngredient16,
        recipe.strIngredient17,
        recipe.strIngredient18,
        recipe.strIngredient19,
        recipe.strIngredient20,
      ].filter((ingredient): ingredient is string => ingredient !== null && ingredient !== "")
    }));
  }
  
  async function nextRecipe(recipeId: string | undefined) {
    try {
      const recipesRemoved = recipes?.filter((recipe: any) => {
        return recipe.uuid !== recipeId;
      })
  
      await getRandRecipe(recipesRemoved);
    } catch(err) {
      console.error(err)
    }
  }

  useEffect(() => {
    async function getRecipes() {
      const response = await fetch(`${URL}/recipes`);
      const data = await response.json();

      await getRandRecipe(data);
    }

    getRecipes();
  }, [])

  return (
    <HomeView recipeIndex={randIndex} rating={recipeRating} comments={recipeComments} recipesArr={recipes} skipRecipe={() => nextRecipe(recipes?.[randIndex].uuid)} />
  );
}

export default HomeController;
