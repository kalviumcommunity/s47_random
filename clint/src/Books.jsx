import React from 'react';

const Books = ({ books }) => {
  return (
    <div>
      <h1>My Favorite Books</h1>
      <ul>
        {books.map((book, index) => (
          <li key={index}>
            <h2>{book.book}</h2>
            <p>Author: {book.author}</p>
            <p>Published Date: {book.published_date}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Books;
