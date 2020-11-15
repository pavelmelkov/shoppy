import React from 'react'
import { Route } from 'react-router-dom'
import { userLogout } from '../actions/userAction'
import { useDispatch, useSelector } from 'react-redux'
import {Nav, Navbar, Container, NavDropdown} from 'react-bootstrap'
import { LinkContainer } from 'react-router-bootstrap'
import  SearchBox  from './SearchBox'
import Categories from './Categories'

const Header = () => {

    const dispatch = useDispatch()

    const userLogin = useSelector(state => state.userLogin)
    const { userInfo } = userLogin

    const logoutHandler = () => {
        dispatch(userLogout())
    }
    return (
        <header>
            <Navbar bg="primary" variant="dark" expand="lg" collapseOnSelect>
                <Container>
                
                <LinkContainer to="/">
                    <Navbar.Brand>Shoppy</Navbar.Brand>
                </LinkContainer>

                    <Navbar.Toggle aria-controls="basic-navbar-nav" />
                    <Navbar.Collapse id="basic-navbar-nav">
                        <Route render={({ history }) => <SearchBox history={history} />} />
                        <Nav className="ml-auto">
                        
                            <LinkContainer  to="/cart">
                                <Nav.Link><i className="fas fa-shopping-cart"></i>CART</Nav.Link>
                            </LinkContainer>
                            {
                                userInfo ? (
                                <NavDropdown title={userInfo.name} id="username">
                                    <LinkContainer to="/profile">
                                            <NavDropdown.Item>
                                                Profile
                                            </NavDropdown.Item>
                                    </LinkContainer>  
                                    <NavDropdown.Item onClick={logoutHandler}>
                                            Logout
                                    </NavDropdown.Item>
                                </NavDropdown>
                                ) : 
                                <LinkContainer to="/login">
                                    <Nav.Link><i className="fas fa-user"></i>LOGIN</Nav.Link>
                                </LinkContainer>
                            }
                            {
                                (userInfo && userInfo.isAdmin) ?
                                    (
                                        <NavDropdown title="Admin" id="adminmenu">
                                            <LinkContainer to="/admin/userlist">
                                                <NavDropdown.Item>
                                                    Users
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/admin/productlist">
                                                <NavDropdown.Item>
                                                    Products
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                            <LinkContainer to="/admin/orderlist">
                                                <NavDropdown.Item>
                                                    Orders
                                                </NavDropdown.Item>
                                            </LinkContainer>
                                        </NavDropdown>
                                    )
                                : null
                             }   
                            

                        {/* <NavDropdown title="Dropdown" id="basic-nav-dropdown">
                            <NavDropdown.Item href="#action/3.1">Action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.2">Another action</NavDropdown.Item>
                            <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                            <NavDropdown.Divider />
                            <NavDropdown.Item href="#action/3.4">Separated link</NavDropdown.Item>
                        </NavDropdown> */}
                        </Nav>
                        {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-success">Search</Button>
                        </Form> */}
                    </Navbar.Collapse>
                    <Categories />
                </Container>
            </Navbar>
        </header>
    )
}

export default Header