# RECIPE EXPLORER
http://recipe-explorer-prod.s3-website-us-west-1.amazonaws.com/

## Why Did We Build Recipe Explorer?
We noticed a common struggle: many of us feel like we're cooking the same meals repeatedly, get indecisive about what to make, or simply lack inspiration. Recipe Explorer addresses this by presenting a random recipe to jump-start the decision process, offering variety, and introducing users to unique new recipes.

## What is Recipe Explorer?

It's a web application designed to make finding and sharing recipes easier and more engaging. Recipe Explorer offers a fresh way to discover recipes and connect with a community. Here’s how it works: users can browse as a guest or create an account. Users can leave comments on recipes, rate them, add their own, and search for recipes by category, cuisine, and ingredient. To spice up mealtime, the app suggests random recipes you might enjoy. You can either skip to another recipe or dive in for full details if one catches your interest.

## Tech Stack
### Front End
- React
- Axios
- Bootstrap & custom CSS
- MealDB API

### Back End
- Node.js
- Express
- JWT
- Multer
- AWS Services
  - DynamoDB
  - EC2
  - S3
 
## Pages
[Home](#home)

[Sign Up](#sign-up)

[Sign In](#sign-in)

[Profile](#profile)

[Recipe Details](#recipe-details)

[Create Recipe](#create-recipe)

[Edit Recipe](#edit-recipe)

[Search Results](#search-results)

---

<a name="home"></a>
**Home**: users are presented with a random recipe, the ability to view a new random recipe (left arrow), the displayed recipe's comments (comments button), or view full details of the displayed recipe (right arrow).

<img alt="home page" src="https://raw.githubusercontent.com/rev-group2/RecipeExplorerFE/refs/heads/main/README_images/home.png" height="500px" width="700px">

<a name="sign-up"></a>
**Sign Up**: users can sign up for an account

<img alt="sign up for account" src="https://raw.githubusercontent.com/rev-group2/RecipeExplorerFE/refs/heads/main/README_images/register.png" width="600" height="300">

<a name="sign-in"></a>
**Sign In**: users can sign in

<img alt="user sign in" src="https://raw.githubusercontent.com/rev-group2/RecipeExplorerFE/refs/heads/main/README_images/login.png" width="600" height="300">

<a name="recipe-details"></a>
**Recipe Details**: users are presented with the full recipe details, along with any recipe reviews, the option to leave a review if user is logged in, and the option to edit the recipe if user is the recipe's creator.

- Guest view:
  
  <img alt="details page guest" src="https://raw.githubusercontent.com/rev-group2/RecipeExplorerFE/refs/heads/main/README_images/recipe-details-guest.png" height="550px" width="500px">

- Logged in user view:

  <img alt="details page user" src="https://raw.githubusercontent.com/rev-group2/RecipeExplorerFE/refs/heads/main/README_images/recipe-details-signed_in.png" height="600px" width="500px">
