# AI Image Generator
## Using OpenAI's Dalle-3

***This web app was built following the @fireship-io tutorial, big thanks to @codediodeio***\
**Painfully and also thankfully the tutorial was from the end of `October 2022`, so it required some modifications and it allowed me to fully understand how it works and further develop my debugging skills**

If you're looking to build this yourself here's some steps you need to take aside from cloning the repository

`npm init vite@latest 'name-of-project'` - **Vanilla JS was used here**\
Access the project directory\
`npm install` - **to install all of the dependencies**\
`npm run dev` **to serve the app locally**

Create a new API key with OpenAI or any other AI of your choice. You can also just use a static image

Insert the API key into a new `.env` directory\
Add the `.env` folder to `.gitignore` for security reasons

### Install dependencies
`npm i dotenv` - **to access the envronment variable created**\
`npm i express cors` - **to build a restful API**\
`npm i openai` - **to be able to make requests to OpenAI**\

To run the backend server use the commnad `node server.js`

Testing the API calls through the VScode extension `Thunder Client`