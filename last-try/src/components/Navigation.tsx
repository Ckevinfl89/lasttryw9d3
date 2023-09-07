import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Container from 'react-bootstrap/Container';

type NavigationProps = {
    isLoggedIn: boolean,
    handleClick: ()=>void
}

export default function Navigation({ isLoggedIn, handleClick }:NavigationProps) {
    
    return (
        <Navbar bg='primary' data-bs-theme='dark'>
            <Container>
                <Navbar.Brand href='/'>To Do List</Navbar.Brand>
                <Nav className='me-auto'>
                    { isLoggedIn ? (
                        <>
                            {/* <Nav.Link href='/'>Create List</Nav.Link> */}
                            <Nav.Link as='button' onClick={handleClick}>Sign Out</Nav.Link>
                        </>
                    ) : (
                        <>
                            <Nav.Link href='/'>Sign Up</Nav.Link>
                            <Nav.Link as='button' onClick={handleClick}>Sign In</Nav.Link>
                        </>
                    )}
                </Nav>
            </Container>
        </Navbar>
    )
}
