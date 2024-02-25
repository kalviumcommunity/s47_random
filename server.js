const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const app = express();
const mongoose = require('mongoose');
const port = 2000;
app.use(express.json());
app.use(cors());

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
const connectionString = 'mongodb+srv://goru-2004:goru-2004@cluster.0cv8pyz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString)
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((err) => {
    console.error('Error ', err);
  });

app.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    console.error('Error ', error);
  }
});

app.post('/add', async (req, res) => {
  const schema = Joi.object({
    username: Joi.string().min(3).max(30).required().label('Userame'),
    email: Joi.string().email().required().label('Email'),
  }).options({abortEarly: false});

  const userData = req.body; // Get user data from the request body
  console.log('request body:  ',userData)
  const { error, value } = schema.validate(userData);
  if (error) {
    console.log(error)
    res.status(400).json({ error });
  }
  else {
    try {
      console.log("validated value:  ",value)
      const createdUser = await User.create(value); // Create a new user
      console.log('user created:  ',createdUser)
      res.status(201).json(createdUser); // Respond with the created user
    } catch (error) {
      res.status(500).json({ message: 'Error creating user', error: error.message }); // Respond with an error message
    }
  }
});

app.put('/users/:id', async (req, res) => {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    res.json(updatedUser);
  } catch (error) {
    console.error('Error updating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Delete a user by ID
app.delete('/users/:id', async (req, res) => {
  try {
    await User.findByIdAndDelete(req.params.id);
    res.status(204).send();
  } catch (error) {
    console.error('Error deleting user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
