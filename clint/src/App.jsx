

import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Books from './Books.jsx'; 
import data from './data.json'; // Import your JSON data here
import Users from './Users.jsx';
import Forms from './Forms.jsx';
import EditForm from './EditForm.jsx';
import Login from './Login.jsx';


function Home() {
  return (
    <div>
      <h3>M9_E1,2,3_Gv</h3>
      <p className='g'># 📅 Here are some random health facts: 🤧</p>
      <p></p>

        <p>Drinking at least five glasses of water a day can reduce your chances of suffering from a heart attack by 40%1.</p>

        <p>Repeatedly using a plastic water bottle can release chemicals into your water1.</p>

        <p>Brushing teeth too soon after eating or drinking can soften the tooth enamel, especially if you’ve just been eating or drinking acidic foods1.</p>

        <p>Breathing deeply in moments of stress, or anytime during the day, brings many benefits such as better circulation, decreased anxiety, and reduced blood pressure1.</p>

        <p>On average, there are more bacteria per square inch in a kitchen sink than the bathroom1.😶‍🌫️</p>

        <p>39% of adults in the world are overweight1.</p>

        <p>Swearing can make you feel better when you'npx create-react-app my-react-router-appnpx create-react-app my-react-router-appre in pain1.</p>

        <p>Gardening can be an effective way to build strength throughout your body1.</p>

        <p>86 million adults in the US use a health or fitness app1.</p>

        <p>Men and women store fat very differently1.</p>

        <p>The average person burns 50 calories every hour while they sleep1.</p>

        <p>During workouts, 🤦‍♀️women tend to burn more fat, but post-workout men burn more fat1.</p>

        <p>According to a study from Harvard University, people who are always running late tend to be happier and live longer1.</p>

        <p>Between 2000 and 2015, the average global life expectancy increased by five years1.</p>

        <p>The US spends almost three times more on healthcare than any other country in the world, but ranks last in life expectancy among the 12 wealthiest industrialized countries1.</p>

        <p>During an allergic reaction your immune system is responding to a false alarm that it perceives as a threat1.</p>

        <p>Maintaining good relationships with your friends and family, reduces harmful levels of stress and boosts your immune system1.</p>

      </div>
  );
}

function App() {
  const [isDarkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    setDarkMode(prevMode => !prevMode);
  };

  return (
    <Router>
      <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/books">Books</Link>
            </li>
            <li>
              <Link to='/users'>Users</Link>
            </li>
            <li>
              <Link to='/add-user'>Add User</Link>
            </li>
            <li>
              <Link to='/login'>login</Link>
            </li>
          </ul>
        </nav>

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/books" element={<Books books={data.MyFavBooks} />} />
          <Route path='/users' element={<Users />} />
          <Route path='/add-user' element={<Forms />} />
          <Route path='/users/edit' element={<EditForm />} />
          <Route path='/login' element={<Login />} />
        </Routes>

        <button onClick={toggleDarkMode}>Dark/light</button>
        <footer>...&copy;, ,  Made  by Gourasnh vavishnav</footer>
      </div>
    </Router>
  );
}

export default App;
