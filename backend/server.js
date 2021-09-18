const express = require("express");
const cors = require("cors");
const app = express();
require('./sequalize.js');
const httpServer = require('http').createServer(app);

const io = require('socket.io')(httpServer, {
  cors: {origin : '*'}
});

var corsOptions = {
  origin: ["http://localhost:4200","http://localhost:80","http://3.109.113.141"]
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Expert Q application." });
});

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('message', (message) => {
    console.log(message);
    io.emit('message', `${socket.id.substr(0, 2)} said ${message}`);
  });

  socket.on('disconnect', () => {
    console.log('a user disconnected!');
  });
});





 app.use('*/uploads',express.static('uploads'));

require("./app/routes/company.routes")(app);
require("./app/routes/spoc.routes")(app);
require("./app/routes/contractor.routes")(app);
require("./app/routes/delegate.routes")(app);
require("./app/routes/listing.routes")(app);
require("./app/routes/hiring.routes")(app);
require("./app/routes/project.routes")(app);
require("./app/routes/users.routes")(app);
require("./app/routes/fileupload.routes")(app);
require("./app/routes/resource.routes")(app);
 const PORT = process.env.PORT || 8090;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});