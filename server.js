const express = require('express');
const cors = require('cors');
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
    console.error('Error connecting to MongoDB:', err);
  });

app.get('/', async (req, res) => {
  try {
    const users = await User.find().exec();
    res.json(users);
  } catch (error) {
    console.error('Error retrieving user data:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.post('/add', async (req, res) => {
  try {
    const newUser = await User.create(req.body);
    res.status(201).json(newUser);
  } catch (error) {
    console.error('Error creating user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

app.listen(port, () => {
  console.log(`Server running on PORT: ${port}`);
});
