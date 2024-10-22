import React, { useState, useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import RecipeFormView from './RecipeFormView'
import { UserContext } from '../Context/UserContext'
import config from '../../config';
const PURL = `${config.path}`;

export interface Recipe {
  uuid: string;
  recipeName: string;
  cuisine: string;
  category: string;
  instructions: string;
  recipeThumb: string;
  ingredients: string[];
  description?: string;
}

type EditRecipeProps = {recipeUuid: string | undefined, isEditing: boolean};

function CreateRecipeController({recipeUuid, isEditing}: EditRecipeProps) {
  const [imageFile, setImageFile] = useState<File | undefined>(undefined);
  const [imageFileURL, setImageFileURL] = useState<string | undefined>(undefined);
  const [existingRecipe, setExistingRecipe] = useState<Recipe | undefined>(undefined);
  const [submitted, setSubmitted] = useState<boolean>(false);
  const [message, setMessage] = useState<string>("");
  const user = useContext(UserContext);
  const navigate = useNavigate();

  function handleImageSelection(e: React.ChangeEvent<HTMLInputElement>) {
    try {
      const file = e.target.files?.[0];
      
      if (file) {
        setMessage("");
        const imageUrl = URL.createObjectURL(file);
        setImageFileURL(imageUrl);
        setImageFile(file);
      }
    } catch(err) {
      console.error(err);
    }
  }

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      
      if (formJson.recipeThumb instanceof File && formJson.recipeThumb.name === "" && imageFile) {
        formJson.recipeThumb = imageFile;
      } else if (isEditing && !imageFile && existingRecipe?.recipeThumb) {
        formJson.recipeThumb = existingRecipe.recipeThumb;
      }
      console.log(formJson)
      
      if (Object.values(formJson).includes("")) {
        setMessage("All fields are required");
      } else if (formJson.recipeThumb instanceof File && formJson.recipeThumb.name === "" && !isEditing) {
        setMessage("You must upload an image");
      } else {
        isEditing && recipeUuid ? editRecipe(formJson, form) : createRecipe(formJson, form);
      }
    } catch(err) {
      console.error(err);
    }
  }

  async function createRecipe(recipe: Object, formElement: HTMLFormElement) {
    const payload = {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${user?.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(recipe)
    }

    try {
      const recipeResponse = await fetch(`${PURL}/recipes`, payload);
      
      if (recipeResponse.ok) {
        resetData(formElement);
      }
    } catch(err) {
      setMessage("Failed to create recipe, try again");
      console.error(err);
    }
  }

  async function editRecipe(recipe: Object, formElement: HTMLFormElement) {
    const updatedRecipeData = {...recipe, uuid: existingRecipe?.uuid};

    const payload = {
      method: "PUT",
      headers: {
        "Authorization": `Bearer ${user?.token}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify(updatedRecipeData)
    }

    try {
      const recipeResponse = await fetch(`${PURL}/recipes`, payload);
      
      if (recipeResponse.ok) {
        resetData(formElement);
      }
    } catch(err) {
      setMessage("Failed to edit recipe, try again");
      console.error(err);
    }
  }

  function resetData(formElement: HTMLFormElement) {
    setSubmitted(true);
    formElement.reset();
    setImageFile(undefined);
    setImageFileURL(undefined);
    setMessage("");

    setTimeout(() => setSubmitted(false), 500);
  }

  useEffect(() => {
    async function getRecipe() {
      const response = await fetch(`${PURL}/recipes/${recipeUuid}`);
      const data = await response.json();

      setExistingRecipe(data);
      setImageFileURL(data.recipeThumb);
    }

    if (isEditing && recipeUuid) {
      getRecipe();
    }
  }, [])

  useEffect(() => {
    return () => {
      if (imageFileURL) {
        URL.revokeObjectURL(imageFileURL);
      }
    };
  }, [imageFileURL]);

  useEffect(() => {
    if (!user?.token) {
      navigate("/");
    }
  }, [user?.token, navigate]);

  return (
    <RecipeFormView recipeData={existingRecipe} editRecipe={isEditing} submitForm={handleSubmit} selectImage={handleImageSelection} imageFile={imageFile} imageURL={imageFileURL} formMessage={message} submitted={submitted}/>
  )
}

export default CreateRecipeController