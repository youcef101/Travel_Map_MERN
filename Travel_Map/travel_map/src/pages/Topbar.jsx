import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { LogoutCall } from '../Redux/apiCalls';



const Topbar = () => {
    const user = useSelector(state => state.user?.current_user)
    const dispatch = useDispatch()
    const logout = () => {
        LogoutCall(dispatch)
    }
    return <Container>
        <Header>

            <Right>
                {!user ? <>
                    <LoginBtn >
                        <Link to='/login'>
                            <span>LOGIN</span>
                        </Link>
                    </LoginBtn>

                    <Register>
                        <Link to='/register'>
                            <span>REGISTER</span>
                        </Link>
                    </Register>
                </> :
                    <Logout onClick={logout}>
                        <span>LOGOUT</span>
                    </Logout>
                }
            </Right>
        </Header>
    </Container>;
};

export default Topbar;
const Container = styled.div`
height:60px;
background-color:transparent;
position:absolute;
z-index:999;
display:flex;
align-items:center;
width:100%;
`
const Header = styled.div`
flex:5;
margin:0px 20px;
`
const Right = styled.div`

display:flex;
justify-content:flex-end;
`
const LoginBtn = styled.button`
a{
    text-decoration:none;
    color:white;
}
background-color:red;
border:none;
color:white;
font-weight:bold;
border-radius:4px;
height:30px;
min-width:100px;
font-size:12px;
cursor:pointer;
margin:0px 5px;
&:hover{
    background-color:#ff6666;
};

`
const Register = styled(LoginBtn)``
const Logout = styled(LoginBtn)``