import React from 'react'
import { Link } from 'react-router-dom'
import {Navbar, Nav, NavItem, NavDropdown, MenuItem} from 'react-bootstrap'

const Header = ({user})=>(
  <Navbar style={{background:"#db4c3f",borderRadius:0, marginBottom:"0px", borderWidth:"0px", fontSize:"125%"}}>
  <Navbar.Header>
    <Navbar.Brand>
      <Link style={{color:"white"}} to="/">iDo</Link>
    </Navbar.Brand>
  </Navbar.Header>
  <Nav>
    <NavItem>
      <Link style={{color:"white"}} to='/'>Home </Link>
    </NavItem>
    <NavItem href={`/${user.username}`}>
      <span style={{color:"white"}}>Todos </span>
    </NavItem>
    <NavItem>
      <Link style={{color:"white"}} to='/friends'>Friends </Link>
    </NavItem>
  </Nav>
  <Nav pullRight>
    <NavItem href='/auth/logout'>
      <span style={{color:"white"}}>Log Out </span>
    </NavItem>
  </Nav>
</Navbar>
)

export default Header;