import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LoginCall } from '../Redux/apiCalls';

const Login = () => {
  const dispatch = useDispatch()
  const [inputs, setInputs] = useState({
    username: '',
    password: ''
  })
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }

  const SignIn = (e) => {
    e.preventDefault();
    const user = {
      username: inputs.username,
      password: inputs.password
    }
    LoginCall(dispatch, user)
  }

  return <Container >
    <Wrapper>
      <Title>SIGN IN</Title>
      <Form>
        <Input name='username' type='text' placeholder='username' onChange={handleChange} />
        <Input name='password' type='password' placeholder='password' onChange={handleChange} />
        <Button onClick={SignIn} >LOGIN</Button>
        <Lien>DO NOT YOU REMEMBER THE PASSWORD?</Lien>
        <BottomContainer>
          <span>Dont't have an account ? <Link to="/register">Register</Link></span>
        </BottomContainer>
      </Form>
    </Wrapper>
  </Container>;
};

export default Login;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  background-color:#f2f2f2;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  min-width: 25%;
  padding: 20px;
  background-color: white;
  
`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 10px 0;
  padding: 10px;
  &:focus{
      outline:none
    }
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  margin-bottom: 10px;
   &:hover{
      background-color:#00e6e6;
  }
`;

const Lien = styled.a`
  margin: 5px 0px;
  font-size: 12px;
  text-decoration: underline;
  cursor: pointer;
`;
const BottomContainer = styled.div`
white-space:nowrap;
a{
    text-decoration:none;
    font-size:18px;
    color:black;
    cursor:pointer;
}
`
