const express = require ("express");
const mongoose = require("mongoose");
const bodyParser = require ("body-parser");
const app = express ()





app.get("/", (req,res) => {
 res.send(" Hello from node API");
});   


app.post('/api/products',(req,res) =>{
  console.log(req.body);
res.send(req.body);
});


mongoose.connect("mongodb+srv://blessedlouistechnologylimited_db_user:ZTIPbpQCkayqchpO@cluster0.o1m77pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Louis database is connected");
});
app.listen(3000, () => {
    console.log("server is running on port 3000");
});




