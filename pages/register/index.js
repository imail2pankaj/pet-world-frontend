import Link from 'next/link'
import React from 'react'
import Containerer from 'react-bootstrap/Container';
import { Button, Form } from "react-bootstrap";

const Register = () => {
  return (
    <Containerer fluid="xxl">      
    <div className='login-main'>
      <h2>Sign up to <b>PetWorld</b></h2>
        <div className="mb-3 mt-4 lg-3">
          <div className="mb-3">
            <Form>
              <Form.Group className="mb-4" controlId="formBasicEmail">  
                <Form.Control type="email" placeholder="First name*" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">  
                <Form.Control type="email" placeholder="Last name*" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicEmail">  
                <Form.Control type="email" placeholder="Email*" />
              </Form.Group>
              <Form.Group className="mb-4" controlId="formBasicPassword">                        
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>  
              <Form.Group className="mb-4" controlId="formBasicPassword">                        
                <Form.Control type="password" placeholder="Confirm Password*" />
              </Form.Group>                      
              <div className="mb-5">
                <Button className='button-1' variant="primary" type="submit">
                  Sign up
                </Button>
              </div>
            </Form>
            <Form.Group className="mb-4" controlId="formBasicCheckbox">                        
              You agree with the <Link className='tc' href={`/#`}><b>Terms & Conditions</b></Link> and <Link className='tc' href={`/#`}><b>Data policy</b></Link>.
            </Form.Group>
            <div className="already mt-3">                      
            Already registered?{" "} <Link href={`/login`}><b>Login</b></Link>
            </div>
          </div>
        </div>      
    </div>
    </Containerer>
  )
}

export default Register