import express from "express";

import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

const users = [
    {
    "firstName":"john",
    "lastName":"doe",
    "age":25
},
{
    "firstName":"john",
    "lastName":"doe",
    "age":25
}
]

router.get('/',(req, res) =>{
 res.send(users);
});

router.post('/', (req,res)=>{
    const user = req.body;


    users.push({ ...user,id: uuidv4() });

    res.send("user with the username $ {user.firstname} added to the database ");
});




export default router;