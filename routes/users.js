import express from "express";

const router = express.Router();

const users = [
{
    firstName:"john",
    lastName:"doe",
    age:25
},
{
    firstName:"anny",
    lastName:"nike",
    age:20
},
{
    firstName:"Louis",
    email:"louis@gmail.com",
    lastName:"Emeka",
},
]

router.get('/',(req, res) =>{
 res.send(users);
});

router.post('/', (req,res)=>{
    const user = req.body;

    console.log('user');


    users.push(user);

    res.send("user with the username $ {user.firstname} added to the database ");
});




export default router;