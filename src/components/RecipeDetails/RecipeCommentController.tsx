import React, { useContext } from 'react'
import RecipeCommentView from './RecipeCommentView';
import { UserContext } from '../Context/UserContext';
import { CommentType } from '../Types/commentType';
import CommentsView from '../Home/CommentsView';
import config from '../../config';
const URL = `${config.path}`;

type CommentProps = {recipeUuid: string | undefined, comments: CommentType[] | undefined, commentSubmission: () => void}

function RecipeCommentController({recipeUuid, comments, commentSubmission}: CommentProps) {
  const user = useContext(UserContext);
  
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
        commentSubmission();
      }
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <>
    { user?.token ?
      <RecipeCommentView submitForm={handleCommentFormSubmit}/> : null
    }
    <CommentsView comments={comments} isVisible={true} />
    </>
  )
}

export default RecipeCommentController