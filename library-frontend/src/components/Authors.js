import React, {useState} from 'react'

const Authors = ({ show, result, editBorn }) => {
  console.log(result.data.allAuthors)
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
    setBorn('')
  }

  const handleChange = (event) => {
    setName(event.target.value)
  }

  console.log(result)

  if (result.loading) {
    return <div>loading authors...</div>
  }

  const authors = result.data.allAuthors

  if(name.length === 0) {
    setName(authors[0].name)
  }

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
          <select onChange={handleChange} value={name}>
          {authors.map(a => <option key={a.id} value={a.name}>{a.name}</option>)}
          </select>
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