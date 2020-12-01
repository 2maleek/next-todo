import React from 'react';
import Todos from '@/components/todos';
import { Container } from 'react-bootstrap';

export default class Home extends React.Component {
  static async getInitialProps() {
    const getTodos = await fetch('http://localhost:3000/api/todos');
    const todos = await getTodos.json()

    return { todos }
  }

  render() {
    console.log( )
    return (
      <div>
        <Container>
          <Todos todos={this.props} />
        </Container>
      </div>
    )
  }
}