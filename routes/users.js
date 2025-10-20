import express from "express";

// - GET http://localhost:3000/users lists all users.
// - POST http://localhost:3000/users creates a user.
// - PATCH http://localhost:3000/users/:id updates a user by id.
// - DELETE http://localhost:3000/users/:id deletes a user.

// Router for in-memory user operations (demo purposes)
import { v4 as uuidv4 } from 'uuid';

const router = express.Router();

// In-memory users store; resets on server restart
let users = [];

// GET /users - Return all users
router.get('/',(req, res) =>{
  res.send(users);
});

// POST /users - Create a new user with UUID
// Expects JSON body: { firstName, lastName, age }
// Note: Use backticks for template string interpolation if including variables in responses
router.post('/', (req,res)=>{
  const user = req.body;

  users.push({ ...user, id: uuidv4() });

  res.send('user with the username ${ user.firstName } added to the database!');
});

// GET /users/:id - Fetch a user by id
router.get('/:id',(req, res) => {
  const { id } = req.params;

  const foundUser = users.find((user) => user.id == id);

  res.send(foundUser);
});

// DELETE /users/:id - Delete a user by id
router.delete('/:id',(req, res)=>{
  const { id } = req.params;

  users = users.filter((user) => user.id !== id);

  res.send("user with the id ${ id } deleted from the database.");
});

// PATCH /users/:id - Partially update user fields
router.patch('/:id',(req, res) =>{
  // Extract id and updatable fields from request
  const { id } = req.params;
  const { firstName, lastName, age } = req.body;

  // Find the target user by id (== allows string/number comparison)
  const user = users.find((user)=> user.id == id);

  // Handle not-found case explicitly
  if (!user) {
    return res.status(404).send(`User with id ${id} not found`);
  }

  // Apply partial updates only for provided fields
  if (firstName) user.firstName = firstName;
  if (lastName) user.lastName = lastName;
  if (age) user.age = age;

  // Send confirmation response
  res.send(`User with id ${id} has been updated`);
})

// Export router to be mounted at /users in index.js
export default router;