const express = require("express");
const cors = require("cors");
const app = express();

 
const db = require("./app/models");
 //db.sequelize.sync({force: true});
//db.sequelize.sync();
var corsOptions = {
  origin: "http://localhost:4200"
};

app.use(cors(corsOptions));

// parse requests of content-type - application/json
app.use(express.json());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// simple route
app.get("/test", (req, res) => {
  
    console.log("start 1");
    asyncApiCall();

    
 });

 
 
// set port, listen for requests
const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});