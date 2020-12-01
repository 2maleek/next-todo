import {Container, Navbar} from 'react-bootstrap'

export default function Nav() {
  return (
    <Navbar expand="lg" variant="light" bg="light">
      <Container>
        <Navbar.Brand href="#">Simple Todos App</Navbar.Brand>
      </Container>
    </Navbar>
  )
}