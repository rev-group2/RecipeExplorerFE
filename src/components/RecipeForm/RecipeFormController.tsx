import React, { useState, useContext, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import RecipeFormView from './RecipeFormView';
import { UserContext } from '../Context/UserContext';
import uploadImage from '../../helpers/uploadImage';
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

function RecipeFormController() {
  const { uuid } = useParams<{uuid: string}>();
  const [isEditing, setIsEditing] = useState<boolean>(false);
  const [recipeUuid, setRecipeUuid] = useState<string | undefined>(undefined);
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

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());

      if (imageFile && user?.token) {
        try {
          const uploadUrl = await uploadImage(imageFile, user?.token);
          if (uploadUrl) {
            formJson.recipeThumb = uploadUrl;
          }
        } catch(err) {
          console.error(err);
          setMessage("Failed to upload image, check file size (max 3mb)")
          return;
        }
      } else if (isEditing && !imageFile && existingRecipe?.recipeThumb) {
        formJson.recipeThumb = existingRecipe.recipeThumb;
      }
      
      if (Object.values(formJson).includes("")) {
        setMessage("All fields are required");
        return;
      }
      
      if (!imageFile && !isEditing) {
        setMessage("You must upload an image");
        return;
      }
      
      isEditing && recipeUuid ? await editRecipe(formJson, form) : await createRecipe(formJson, form);
    } catch(err) {
      console.error(err);
      setMessage("Submission failed, try again")
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
        setSubmitted(true);
        resetData(formElement);
      }

      setTimeout(() => setSubmitted(false), 500);
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
        setSubmitted(true);
        resetData(formElement);
      }

      setTimeout(() => setSubmitted(false), 500);
    } catch(err) {
      setMessage("Failed to edit recipe, try again");
      console.error(err);
    }
  }

  async function handleDelete(e: React.MouseEvent<HTMLButtonElement>) {
    e.preventDefault();

    const payload = {
      method: "DELETE",
      headers: {
        "Authorization": `Bearer ${user?.token}`,
        "Content-Type": "application/json"
      }
    }

    try {
      const recipeResponse = await fetch(`${PURL}/recipes/${existingRecipe?.uuid}`, payload)

      if (recipeResponse.ok) {
        setSubmitted(true);
      }

      navigate("/");
    } catch (err) {
      console.error(err)
    }
  }

  function resetData(formElement: HTMLFormElement) {
    formElement.reset();
    setImageFile(undefined);
    setMessage("");
    if (!isEditing) {
      setImageFileURL(undefined);
    }
  }

  useEffect(() => {
    async function getRecipe(recipeId: string) {
      const response = await fetch(`${PURL}/recipes/${recipeId}`);
      const data = await response.json();

      setExistingRecipe(data);
      setImageFileURL(data.recipeThumb);
    }

    if (uuid) {
      setIsEditing(true);
      setRecipeUuid(uuid);
      getRecipe(uuid);
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
    <RecipeFormView recipeData={existingRecipe} editRecipe={isEditing} deleteRecipe={handleDelete} submitForm={handleSubmit} selectImage={handleImageSelection} imageURL={imageFileURL} formMessage={message} submitted={submitted}/>
  )
}

export default RecipeFormController