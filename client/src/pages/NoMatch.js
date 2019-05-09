import React from 'react'
import Jumbotron from '../components/Jumbotron';

function NoMatch() {
  return (
    <div className="container">
      <Jumbotron
        image="../img/books_3.jpeg"
        title="404"
        lead="Page Not Found"
        instructions="Try Again!!!"
      />
    </div>
  )
}

export default NoMatch;