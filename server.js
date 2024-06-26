const express = require('express');
const cors = require('cors');
const Joi = require('joi');
const app = express();
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const port = 2000;
const cookieParser = require('cookie-parser');
app.use(express.json()); // Add this middleware to parse JSON in the request body
app.use(cookieParser());
const SECRET_KEY = 'secret';
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true
}));


const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
const connectionString = 'mongodb+srv://goru-2004:goru-2004@cluster.0cv8pyz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString)
  .then(() => {
    console.log('We Are Connected to Goru MongoDB');
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
  const newData = req.body; // Get the updated data from the request body
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    return res.status(401).json({ message: 'Authorization header not provided' });
  }

  const token = authHeader.split(' ')[1];
  let decoded;

  try {
    decoded = jwt.verify(token, SECRET_KEY);
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      // The token has expired
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    } else if (error instanceof jwt.JsonWebTokenError) {
      // Some other JWT error occurred
      return res.status(401).json({ message: 'Invalid token.' });
    }
    // Handle other errors
    return res.status(500).json({ message: 'Error verifying token', error: error.message });
  }

  const userId = req.params.id;

  // Ensure both userId and decoded.userId are strings before comparing
  if (typeof userId !== 'string' || typeof decoded.userId !== 'string') {
    return res.status(400).json({ message: 'Invalid user ID format.' });
  }

  if (decoded.userId !== userId) {
    return res.status(401).json({ message: 'Unauthorized: cannot update other users' });
  }

  try {
    const updatedUser = await User.findByIdAndUpdate(userId, newData, { new: true }); // Find a user by ID and update with the new data
    if (updatedUser) {
      res.status(200).json(updatedUser); // Respond with the updated user
    } else {
      res.status(404).json({ message: 'User not found' }); // Respond with a message if user is not found
    }
  } catch (error) {
    res.status(500).json({ message: 'Error updating user', error: error.message }); // Respond with an error message
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
//**********************login************************************ */
   // POST route to login
   app.post('/login', async (req, res) => {
    const schema = Joi.object({
      name: Joi.string().min(3).max(30).required().label('Username'),
      email: Joi.string().email().required().label('Email'),
    }).options({ abortEarly: false });
  
    const userData = req.body;
  
    const { error, value } = schema.validate(userData);
  
    if (error) {
      res.status(400).json({ message: 'Validation failed', errors: error.details });
      return;
    }
  
    const { name, email} = value;
  
    try {
      const findUser = await User.findOne({ email });
      if (!findUser) {
        res.status(404).json({ message: 'user not found' });
        return;
      }
      const token = jwt.sign({ userId: findUser._id, email: findUser.email }, SECRET_KEY ,{expiresIn: '1h'});
      console.log(token)
      res.cookie('token', token, { httpOnly: false, maxAge: 36000000, sameSite: 'none', secure: true,path: '/' }); // 1 hour expiration time
      res.cookie('username', name,{httpOnly: true});
      res.status(200).json({message: 'user found and logged in'});
    } catch (err) {
      res.status(500).json({ message: 'Error', error: err.message });
    }
  });

  //*****************************LOGOUT*******************************/

  app.get('/logout', (req, res) => {
    res.clearCookie('username');
    res.clearCookie('token');
    res.status(200).send({ message: 'Logged out successfully' });
  });
  

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
