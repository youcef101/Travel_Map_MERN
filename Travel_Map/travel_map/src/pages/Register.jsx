import React, { useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import styled from 'styled-components';
import axiosInstance from '../axios'

const Register = () => {
  const history = useHistory()
  const [inputs, setInputs] = useState({
    username: '',
    email: '',
    password: '',

  })
  const handleChange = (e) => {
    setInputs({
      ...inputs,
      [e.target.name]: e.target.value
    })
  }
  //console.log(inputs)
  const createUser = async (e) => {
    e.preventDefault();
    const newUser = {
      username: inputs.username,
      email: inputs.email,
      password: inputs.password
    }
    try {
      await axiosInstance.post('/auth/register', newUser);
      history.push('/login');
    } catch { }
  }
  return <Container>
    <Wrapper>
      <Title>CREATE AN ACCOUNT</Title>
      <Form>
        <Input placeholder="username" type='text' name="username" onChange={handleChange} />
        <Input placeholder="email" type='email' name="email" onChange={handleChange} />
        <Input placeholder="password" type='password' name="password" onChange={handleChange} />

        <Agreement>
          By creating an account, I consent to the processing of my personal
          data in accordance with the <b>PRIVACY POLICY</b>
        </Agreement>
        <Button onClick={createUser}>CREATE</Button>
        <LoginContainer>
          <span>Already have an account ? <Link to="/login">Login</Link></span>
        </LoginContainer>
      </Form>
    </Wrapper>
  </Container>;
};

export default Register;
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  background-color:#f2f2f2;
  display: flex;
  align-items: center;
  justify-content: center;
`;

const Wrapper = styled.div`
  min-width: 40%;
  padding: 20px;
  background-color: white;

`;

const Title = styled.h1`
  font-size: 24px;
  font-weight: 300;
`;

const Form = styled.form`
  display: flex;
  flex-direction:column;
  flex-wrap: wrap;
`;

const Input = styled.input`
  flex: 1;
  min-width: 40%;
  margin: 20px 10px 0px 0px;
  padding: 10px;
  &:focus{
      outline:none;
  }
`;

const Agreement = styled.span`
  font-size: 12px;
  margin: 20px 0px;
`;

const Button = styled.button`
  width: 40%;
  border: none;
  padding: 15px 20px;
  background-color: teal;
  color: white;
  cursor: pointer;
  &:hover{
      background-color:#00e6e6;
  }
`;
const LoginContainer = styled.div`
margin:5px;
a{
    text-decoration:none;
    font-size:18px;
    color:black;
    cursor:pointer;
}
`