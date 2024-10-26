import React, { useContext, useState } from 'react'
import RecipeCommentView from './RecipeCommentView';
import { UserContext } from '../Context/UserContext';
import { CommentType } from '../Types/commentType';
import CommentsView from '../Home/CommentsView';
import config from '../../config';
const URL = `${config.path}`;

type CommentProps = {recipeUuid: string | undefined, comments: CommentType[] | undefined}

function RecipeCommentController({recipeUuid, comments}: CommentProps) {
  const user = useContext(UserContext);
  const [recipeComments, setRecipeComments] = useState<CommentType[] | undefined>(undefined);
  
  async function handleCommentFormSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    try {
      const form = e.currentTarget;
      const formData = new FormData(form);
      const formJson = Object.fromEntries(formData.entries());
      
      if (user?.uuid && user.token && recipeUuid) {
        formJson.authorUuid = user?.uuid;
        formJson.recipeUuid = recipeUuid;
      }

      const payload = {
        method: "POST",
        headers: {
          "Authorization": `Bearer ${user?.token}`,
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formJson)
      }

      const response = await fetch(`${URL}/comments`, payload);

      if (response.ok) {
        form.reset();
        await getRecipeComments();
      }
    } catch (err) {
      console.error(err);
    }
  }

  async function getRecipeComments() {
    try {
      const responseComments = await fetch(`${URL}/comments/recipe/?recipe=${recipeUuid}`);
      const dataComments = await responseComments.json();
    
      setRecipeComments(dataComments);
    } catch (err) {
      console.error(err)
    }
  }

  return (
    <>
    { user?.token ?
      <RecipeCommentView submitForm={handleCommentFormSubmit}/> : null
    }
    <CommentsView comments={recipeComments} isVisible={true} />
    </>
  )
}

export default RecipeCommentController