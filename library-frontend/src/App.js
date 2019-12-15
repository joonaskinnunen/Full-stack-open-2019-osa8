import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery } from '@apollo/react-hooks'

const App = () => {
  const [page, setPage] = useState('authors')

  const ALL_AUTHORS = gql`
    {
      allAuthors  {
        name
        born
        id
        bookCount
      }
    } 
  `

  const ALL_BOOKS = gql`
    {
      allBooks  {
        title
        author
        published
        id
      }
    } 
  `

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        show={page === 'authors'} result={useQuery(ALL_AUTHORS)}
      />

      <Books
        show={page === 'books'} result={useQuery(ALL_BOOKS)}
      />

      <NewBook
        show={page === 'add'}
      />

    </div>
  )
}

export default App