import React from 'react'
import { Link } from 'react-router-dom'

const Logout = () => {
  return (
    <div>
      <h1>Logout Successfull</h1>
      <br></br>
      <Link to={"/login"}>Login</Link>
      <br></br>
      <Link to={"/signup"}>Signup</Link>
    </div>
  )
}

export default Logout
