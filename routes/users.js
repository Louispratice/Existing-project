import express from "express";

const router = express.Router();

const users = [
{
    firstName:"john",
    lastName:"doe",
    age:25
}
]

router.get('/',(req, res) =>{
    console.log(users);
 res.send("hello from here");
});

export default router;