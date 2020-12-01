import Router from 'next/router'
import { useState } from 'react'
import {Container, Form, Button} from 'react-bootstrap'

export default function NewTodo() {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [due_date, setDueDate] = useState('')
  const [submitting, setSubmitting] = useState(false)
  
  async function submitHandler(e) {
    console.log(due_date)
    setSubmitting(true)
    e.preventDefault()
    try {
      const res = await fetch('/api/todos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(
          {
            title,
            description,
            'due_date': new Date(due_date)
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
          <Form.Control type="text" placeholder="Enter Title" value={title} onChange={(e) => setTitle(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="description">
          <Form.Label>Description</Form.Label>
          <Form.Control type="text" placeholder="Description" as="textarea" value={description} onChange={(e) => setDescription(e.target.value)}/>
        </Form.Group>

        <Form.Group controlId="due-date">
          <Form.Label>Due Date</Form.Label>
          <Form.Control type="datetime-local" value={due_date} onChange={(e) => setDueDate(e.target.value)}/>
        </Form.Group>

        <Button variant="primary" type="submit" disabled={submitting}>
          Add
        </Button>
      </Form>
    </Container>
  )
}
