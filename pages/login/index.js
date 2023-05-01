import Link from 'next/link'
import React from 'react'

const Login = () => {
  return (
    <div>
      Login
      <Link href={`/register`}>Register</Link>
      <Link href={`/register`}>Forgot Password?</Link>
    </div>
  )
}

export default Login