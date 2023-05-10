import Link from 'next/link'
import React from 'react'
import Containerer from 'react-bootstrap/Container';
import { Button, Form } from "react-bootstrap";

const Login = () => {
  return (
    <Containerer fluid="xxl">      
    <div className='login-main'>
      <h2>Login to <b>PetWorld</b></h2>
        <div className="mb-3 mt-md-4 lg-3">
          <div className="mb-3">
            <Form>
              <Form.Group className="mb-4" controlId="formBasicEmail">  
                <Form.Control type="email" placeholder="Enter email" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">                        
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>                      
              <div className="mb-5">
                <Button className='button-1' variant="primary" type="submit">
                  Login
                </Button>
              </div>
            </Form>
            <Form.Group className="mb-4" controlId="formBasicCheckbox">                                          
                  <Link href={`/#`}><b>Forgotten password?</b></Link>                  
              </Form.Group>
            <div className="already mt-3">                      
              Not registered?{" "} <Link href={`/register`}><b>Sign up.</b></Link>
            </div>
          </div>
        </div>      
    </div>
    </Containerer>
  )
}

export default Login