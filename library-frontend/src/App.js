import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const App = () => {
  const [page, setPage] = useState('authors')

  const handleError = (e) => {
    console.log(e.graphQLErrors[0].message)
  }

  const CREATE_BOOK = gql`
  mutation createPerson($title: String!, $published: Int!, $author: String!, $genres: [String]) {
    addBook(
      title: $title,
      published: $published,
      author: $author,
      genres: $genres
    ) {
      title
      published
      author
      genres
    }
  }
`
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
  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
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
        show={page === 'add'} addBook={addBook} 
      />

    </div>
  )
}

export default App