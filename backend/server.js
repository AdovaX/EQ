const express = require("express");
const cors = require("cors");
const app = express();
require('./sequalize.js');

var corsOptions = {
  origin: "http://localhost:4200"
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Expert Q application." });
});

require("./app/routes/company.routes")(app);
require("./app/routes/spoc.routes")(app);
require("./app/routes/contractor.routes")(app);
require("./app/routes/delegate.routes")(app);
require("./app/routes/listing.routes")(app);
 const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});