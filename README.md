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
 
## Features
On the home page, users are presented with a random recipe, with the ability to view a new recipe (left arrow), it's comments (comments button), or view full details of the displayed recipe (right arrow).
