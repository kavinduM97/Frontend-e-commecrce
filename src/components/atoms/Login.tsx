import { SyntheticEvent, useState, useEffect } from 'react'
import { Form, Button } from 'react-bootstrap'
import FormContainer from './FormContainer'
import { useNavigate } from "react-router-dom";



const Login = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate();
  const submitHandler = async (e: SyntheticEvent) => {
      e.preventDefault()
      //interract with backend
        await fetch('https://localhost:7075/api/User/login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          credentials:'include',
          body: JSON.stringify({
              email,
              password,
        }),
      })   

      navigate('/')

    }
    return (
      <FormContainer>
        <h1>Login</h1>
        <Form onSubmit={submitHandler}>
          <Form.Group controlId='email' className='my-3'>
            <Form.Label>Email address</Form.Label>
            <Form.Control
              type='email'
              placeholder='Enter your email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </Form.Group>
  
          <Form.Group controlId='password' className='my-3'>
            <Form.Label>Password</Form.Label>
            <Form.Control
              type='password'
              placeholder='Password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </Form.Group>
  
          <Button variant='primary' type='submit' className='my-3'>
            Login
          </Button>
        </Form>
      </FormContainer>
    )
  }

export default Login
