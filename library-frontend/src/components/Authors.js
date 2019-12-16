import React, {useState} from 'react'

const Authors = ({ show, result, editBorn }) => {
  const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  if (!show) {
    return null
  }

  const submit = async (e) => {
    e.preventDefault()
    await editBorn({
      variables: { name, born }
    })
    setName('')
    setBorn('')
  }

  console.log(result)

  if (result.loading) {
    return <div>loading authors...</div>
  }

  const authors = result.data.allAuthors

  return (
    <div>
      <h2>authors</h2>
      <table>
        <tbody>
          <tr>
            <th></th>
            <th>
              born
            </th>
            <th>
              books
            </th>
          </tr>
          {authors.map(a =>
            <tr key={a.id}>
              <td>{a.name}</td>
              <td>{a.born}</td>
              <td>{a.bookCount}</td>
            </tr>
          )}
        </tbody>
      </table>
      <h2>Set birthyear</h2>
      <form onSubmit={submit}>
        <div>
          name
          <input
            value={name}
            onChange={({ target }) => setName(target.value)}
          />
        </div>
        <div>
          born
          <input
            type='number'
            value={born}
            onChange={({ target }) => setBorn(parseInt(target.value))}
          />
        </div>
        <button type='submit'>update author</button>
      </form>
    </div>
  )
}

export default Authors