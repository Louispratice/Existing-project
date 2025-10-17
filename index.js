// TODO: Use dotenv to manage environment variables for secrets and configuration.
// Example: require('dotenv').config(); and read process.env.MONGODB_URI / process.env.PORT
const express = require ("express");
const mongoose = require("mongoose");
// TODO: Prefer built-in express.json() over body-parser for JSON parsing.
const bodyParser = require ("body-parser");
const app = express ()
// TODO: Call app.use(express.json()) before routes so req.body works for JSON requests.





app.get("/", (req,res) => {
 res.send(" Hello from node API");
});   


// TODO: Validate req.body and persist using the Product model instead of echoing.
// TODO: Return proper status codes (201 for created) and consistent error handling.
app.post('/api/products',(req,res) =>{
  console.log(req.body);
res.send(req.body);
});


// TODO: Move MongoDB URI to process.env.MONGODB_URI; never hardcode credentials.
// TODO: Add a .catch(...) to handle connection errors and exit the process on failure.
mongoose.connect("mongodb+srv://blessedlouistechnologylimited_db_user:ZTIPbpQCkayqchpO@cluster0.o1m77pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Louis database is connected");
});
// TODO: Read port from process.env.PORT and default to 3000 if not set.
app.listen(3000, () => {
    console.log("server is running on port 3000");
});




