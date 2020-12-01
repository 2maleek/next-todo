import Router, { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import {Container, Form, Button} from 'react-bootstrap'

export default function EditTodo({todo}) {
  const [_title, setTitle] = useState('')
  const [_description, setDescription] = useState('')
  const [_due_date, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)

  const router = useRouter()
  const { id, title, description, due_date } = router.query

  useEffect(() => {
  console.log(id)

    if (typeof title === 'string') {
      setTitle(title)
    }
    if (typeof description === 'string') {
      setDescription(description)
    }
    if (typeof due_date === 'string') {
      setDueDate(due_date)
    }
  }, [title, description, due_date])
  async function submitHandler(e) {
    setSubmitting(true)
    console.log(id)
    e.preventDefault()
    try {
      const res = await fetch(`/api/todos/${id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            title: _title,
            description: _description,
            'due_date': new Date(_due_date)
          }
        ),
      })
      setSubmitting(false)
      const json = await res.json()
      if (!res.ok) throw Error(json.message)
      Router.push('/')
    } catch (e) {
      console.log(e)
    }
  }

  return (
    <Container>
      <Form onSubmit={submitHandler}>
        <Form.Group controlId="title">
          <Form.Label>Title</Form.Label>
          <Form.Control type="text" placeholder="Enter Title" value={_title} onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" as="textarea" value={_description} onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="due-date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="datetime-local" value={_due_date.substring(0, 16)} onChange={(e) => setDueDate(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={submitting} className="mr-2">
          Edit
        </Button>
        
        <Button variant="danger" type="buttin" onClick={() => Router.push('/')}>
          Cancel
        </Button>

      </Form>
    </Container>
  )
}
