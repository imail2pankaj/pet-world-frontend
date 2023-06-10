import Link from 'next/link';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

function InnerNavbar() {
  return (
    <Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Toggle aria-controls="inner-navbar" />
        <Navbar.Collapse id="inner-navbar">
          <Nav className="me-auto">
            <Link className='nav-link' href="/dashboard">Dashboard</Link>
            <Link className='nav-link' href="/dashboard/pets">Pets</Link>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default InnerNavbar;