import { Container, Navbar, Nav } from 'react-bootstrap';
import { NavLink } from 'react-router-dom';

function Header({ logoOnly = false }) {
  return (
    <Navbar bg="white" variant="light" expand="lg" className="py-3 border-bottom">
      <Container>
        <Navbar.Brand
          as={logoOnly ? 'div' : NavLink}
          to={logoOnly ? undefined : '/'}
          className="d-flex align-items-center"
          style={{ textDecoration: 'none' }}
        >
          <img
            src={process.env.PUBLIC_URL + "/icons/logo-full.png"}
            alt="Project Logo"
            className={logoOnly ? 'img-fluid' : undefined}
            style={{
              height: '60px',
              maxWidth: logoOnly ? '100%' : undefined,
              objectFit: 'contain',
            }}
          />
        </Navbar.Brand>

        {!logoOnly && (
          <>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="ms-auto">
                <Nav.Link
                  as={NavLink}
                  to="/"
                  className="mx-3 text-dark fw-semibold"
                  style={{ textDecoration: 'none' }}
                >
                  Home
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/k8"
                  className="mx-3 text-dark fw-semibold"
                  style={{ textDecoration: 'none' }}
                >
                  K-8
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/about"
                  className="mx-3 text-dark fw-semibold"
                  style={{ textDecoration: 'none' }}
                >
                  About
                </Nav.Link>
                <Nav.Link
                  as={NavLink}
                  to="/publications"
                  className="mx-3 text-dark fw-semibold"
                  style={{ textDecoration: 'none' }}
                >
                  Publications
                </Nav.Link>
              </Nav>
            </Navbar.Collapse>
          </>
        )}
      </Container>
    </Navbar>
  );
}

export default Header;


// import { Container, Navbar, Nav } from 'react-bootstrap';
// import { NavLink } from 'react-router-dom'; // Use this instead of <a href>


// function Header() {
//   return (
//     <Navbar bg="white" variant="light" expand="lg" className="py-3 border-bottom">
//       <Container>
//         <Navbar.Brand href="#home" className="d-flex align-items-center">
//           <img
//             src="/icons/logo-full.png"
//             alt="Project Logo"
//             style={{ height: '60px', objectFit: 'contain' }}
//           />
//         </Navbar.Brand>
//         <Navbar.Toggle aria-controls="basic-navbar-nav" />
//         <Navbar.Collapse id="basic-navbar-nav">
//           <Nav className="ms-auto">
//             <Nav.Link href="#home" className="mx-3 text-dark fw-semibold">Home</Nav.Link>
//             <Nav.Link href="#k8" className="mx-3 text-dark fw-semibold">K-8</Nav.Link>
//             <Nav.Link href="#about" className="mx-3 text-dark fw-semibold">About</Nav.Link>
//             <Nav.Link href="#publications" className="mx-3 text-dark fw-semibold">Publications</Nav.Link>
//           </Nav>
//         </Navbar.Collapse>
//       </Container>
//     </Navbar>
//   );
// }

// export default Header;