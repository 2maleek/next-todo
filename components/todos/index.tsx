import { Table, Button } from 'react-bootstrap'
import Link from 'next/link'
import Router from 'next/router'

function Todos({todos}) {
  async function deleteTodo(id) {
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
      })
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      console.log(e)
    }
  }
  return (
    <>
      <Link href="/new">
        <Button variant="success" size="lg" block className="my-4">
          Add New Todo
        </Button>
      </Link>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>No</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {todos.todos.map((todo, i) => (
            <tr key={todo.id}>
              <td>{i+1}</td>
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.due_date.substring(0, 16).replace('T', ' ')}</td>
              <td>
                <Link href={`/edit/${todo.id}?title=${todo.title}&description=${todo.description}&due_date=${todo.due_date}`}>
                  <Button variant="warning" className="mr-2">Update</Button>
                </Link>
                <Button variant="danger" onClick={() => {deleteTodo(todo.id)}}>Dalete</Button>
              </td>
            </tr>
          ))}

        </tbody>
      </Table>
    </>
  )
}

export default Todos