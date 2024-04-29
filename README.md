# Sensitivity Savors Project

## Project Structure

- `docs/`: put all the design and notes here.
- `back-end/`: server-side source.
- `front-end/`: client-side source.
- `faq_bot/`: a microservice for Question Answering.

## Run Project

### Install dependencies

Run the following command
`npm install`

### Start the server in dev mode

- Run command
`npm run dev`
- Open browser at [http://localhost:3000](http://localhost:3000)

### Inititialize Database

- Open mongodb compass
- Import collection from json file `backend/databases/diet_categories.json`
- Import collection from json file `backend/databases/ingredients.json`
- Import collection from json file `backend/databases/recipes.json`
