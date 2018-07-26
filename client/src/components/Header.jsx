import React from 'react'
import { Link } from 'react-router-dom'
const Header = ({user})=>(
  <div>
    <div>Header</div>
    <Link to='/'>Home </Link>
    <a href={`/${user.username}`}>Profile </a>
    <Link to='/friends'>Show Friends </Link>
    <a href='/auth/logout'>Log Out </a>
  </div>
)

export default Header;