// ------------config env file ---------------------------
require("dotenv").config();

//-------------------installed package----------------------------

const express = require("express");
const cors = require("cors");
const connectdb = require("./src/database/connection.js");
const app = express();
const port = process.env.PORT || 3000;

// --------------------Middlewares---------------------------------------------
app.use(express.json());
app.use(express.json({ urlencoded: true }));
app.use(cors());


// ------------------------Internal Routes Import --------------------------
const todoRoutes = require('./src/routes/todo.routes.js');


// -------------------sample api test --------------------------
app.get("/home", (req, res) => {
  return res.status(200).json({ message: "Project Will be Run Properly" });
});


//--------------------Use Internal Route --------------------------
app.use('/todo', todoRoutes);

// -----------------Database and server----------------------
connectdb()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server Running On ${port}`);
    });
  })
  .catch((e) => {
    console.log(e);
  });
