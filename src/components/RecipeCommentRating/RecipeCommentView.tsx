import React from 'react'

type FormProps = {submitForm: (e: React.FormEvent<HTMLFormElement>) => void}

function RecipeCommentView({submitForm}: FormProps) {
  return (
    <>
    <form id="comment-form" onSubmit={(e: React.FormEvent<HTMLFormElement>) => submitForm(e)}>
      <label>
        <textarea placeholder='Leave a review' id='comment-input' name='description' rows={2} cols={63} required></textarea>
      </label>
      <label>Rate (1 - 10)
        <input type="number" id="recipe-rating" name="rating" min="1" max="10" required/>
      </label>
      <button id="comment-button" type='submit'>Review</button>
    </form>
    </>
  )
}

export default RecipeCommentView