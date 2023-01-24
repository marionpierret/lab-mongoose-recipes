const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI)
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany()
  })
  .then(() => {
    // Run your code here, after you have insured that the connection was made
    Recipe.create({
      title: "Crepes",
      level: "Easy Peasy",
      ingredients: ["Farine", "Beurre", "Sucre", "Oeufs", "Lait"],
      cuisine: "French",
      dishType: "snack",
      image: "https://assets.afcdn.com/recipe/20211122/124598_w1000h667c1cx3176cy2107cxt1161cyt477cxb5347cyb3565.webp",
      duration: 10,
      creator: "Marion",
    })
  .then((recipe) => console.log(recipe.title))
  .then(()=> Recipe.insertMany(data))
  .then((data)=> {
    data.map(e => {
      console.log(e.title)
    })
  })
  .then(()=> Recipe.findOneAndUpdate({title: "Rigatoni alla Genovese"}, {duration: 100}))
  .then(()=> console.log('Rigatoni alla Genovese Updated!'))
  .then(()=> Recipe.deleteOne({title: 'Carrot Cake'}))   
  .then(()=> console.log('Carrot Cake removed!'))
  .then(()=> mongoose.connection.close())
})
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
