const express = require('express');
const app = express();
const mongoose = require('mongoose');
const port = 3000 ;
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
});

const User = mongoose.model('User', userSchema);
const connectionString = 'mongodb+srv://goru-2004:goru-2004@cluster.0cv8pyz.mongodb.net/?retryWrites=true&w=majority';

mongoose.connect(connectionString, { useNewUrlParser: true, useUnifiedTopology: true })
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
      res.send('connected');
    } catch (error) {
      console.error('Error retrieving user data:', error);
    }
  });


if (require.main === module) {
  app.listen(port, () => {
    console.log(`server running on PORT: ${port}`);
  });
}

module.exports = app;

