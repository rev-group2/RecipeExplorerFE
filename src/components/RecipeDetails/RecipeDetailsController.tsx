import React, { useEffect, useContext, useState } from 'react'
import RecipeDetailsView from './RecipeDetailsView'
import { useParams } from 'react-router-dom'
import { RecipeType } from '../Types/recipeType';
import { Meal } from '../Types/mealType';
import { CommentType } from '../Types/commentType';
import { UserContext } from '../Context/UserContext';
import config from '../../config';
const URL = `${config.path}`;

type SingleMeal = Meal['meals'][0];

function RecipeDetailsController() {
  const { uuid } = useParams<{uuid: string}>();
  const [recipe, setRecipe] = useState<RecipeType | undefined>(undefined);
  const [recipeRating, setRecipeRating] = useState<string>("No rating");
  const [recipeComments, setRecipeComments] = useState<CommentType[] | undefined>(undefined);
  const user = useContext(UserContext);

  async function getRecipeComments(recipeId: string | undefined) {
    try {
      const responseComments = await fetch(`${URL}/comments/recipe/?recipe=${recipeId}`);
      const dataComments = await responseComments.json();
    
      setRecipeComments(dataComments);
      calculateRecipeRating(dataComments);
    } catch(err) {
      console.error(err);
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

  function transformMealData(recipe: SingleMeal): RecipeType {
    return {
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
    };
  }

  useEffect(() => {
    async function recipeRating() {
      await getRecipeComments(uuid);
    }

    recipeRating();
  }, [uuid]);

  useEffect(() => {
    async function getRecipe() {
      if (uuid) {
        if (uuid?.length < 8) {
          const response = await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${uuid}`);
          const data = await response.json();
          const transformedRecipe = transformMealData(data.meals[0]);
          setRecipe(transformedRecipe);
        } else {
          const response = await fetch(`${URL}/recipes/${uuid}`);
          const data = await response.json();
          setRecipe(data);
        }
      }
    }

    getRecipe();
  }, [uuid])

  return (
    <RecipeDetailsView recipeAuthor={user?.uuid} recipeDetails={recipe} rating={recipeRating} comments={recipeComments}/>
  )
}

export default RecipeDetailsController