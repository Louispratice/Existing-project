import express from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";

import userRoutes from './routes/users.js';

const app = express();
const Port = 3000;

app.use(bodyParser.json());

app.use('/users', userRoutes);




app.get("/", (req,res) => {
 res.send(" Hello from node API");
});   


mongoose.connect("mongodb+srv://blessedlouistechnologylimited_db_user:ZTIPbpQCkayqchpO@cluster0.o1m77pn.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0")
.then(() => {
    console.log("Louis database is connected");
});
app.listen(3000, () => {
    console.log("server is running on port 3000");
});

