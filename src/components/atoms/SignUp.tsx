import { SyntheticEvent, useState } from 'react'
import FormContainer from './FormContainer'
import { useNavigate } from "react-router-dom";
import { Form, Button } from 'react-bootstrap'



const Signup = () => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const navigate = useNavigate(); // Move this inside the function

  const submitHandler = async (e: SyntheticEvent) => {
    e.preventDefault()
    //interract with backend
      await fetch('https://localhost:7075/api/User/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            email,
            password,
      }),
    })   

    navigate('/login')
  }


  return (
    <FormContainer>
      <h1 className='my-3'>Sign Up</h1>
      <Form onSubmit={submitHandler} className='py-3'>
      

        <Form.Group controlId='email' className='my-3'>
          <Form.Label>Email address</Form.Label>
          <Form.Control
            type='email'
            placeholder='Enter your email address'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group controlId='password' className='my-3'>
          <Form.Label>Password</Form.Label>
          <Form.Control
            type='password'
            placeholder='Enter your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </Form.Group>

        <Button variant='primary' type='submit' className='my-3'>
          Sign Up
        </Button>
      </Form>
    </FormContainer>
  )
}

export default Signup

