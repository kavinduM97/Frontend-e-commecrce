import React from "react"
import { Nav, Navbar as NavbarBS} from "react-bootstrap"
import { NavLink } from "react-router-dom"

import CartButton from "../atoms/CartButton"
import styled from "styled-components";
import { SerarchIcon } from "../atoms/SearchIcon"



const Container = styled.div`
  height: 80px;
 
  @media (max-width: 768px) {
    height: auto;
  }
`;

const Wrapper = styled.div`
  padding: 10px 20px;
  display: flex;
  align-items: center;
  justify-content: space-between;
 
  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Left = styled.div`
  flex: 2;
  display: flex;
  align-items: center;

  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;


const Center = styled.div`
  flex: 1;
  text-align: center;
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;

const Logo = styled.h1`
  font-weight: bold;
  
`;
const Right = styled.div`
  flex: 2;
  display: flex;
  align-items: center;
  justify-content: flex-end;
  
  @media (max-width: 768px) {
    width: 100%;
    justify-content: space-between;
  }
`;


export function Navbar(){
  //const { openCart, cartQuantity } = useShoppingCart()
    return(
    <Container className="bg-white shadow-sm mb-5"> 
      
    
      <Wrapper>
        <Left>
        <Nav >
        <Nav.Link to="/" as={NavLink}>Home </Nav.Link>
      
        <Nav.Link to="/cart" as={NavLink}>Cart </Nav.Link>
        </Nav>
          <SerarchIcon/>
        </Left>
        <Center>
          <Logo>storeLK.</Logo>
        </Center>
        <Right>
        <Nav >
        <Nav.Link to="/login" as={NavLink}>Login </Nav.Link>
      
        <Nav.Link to="/signup" as={NavLink}>SignUp </Nav.Link>
        </Nav>
        <CartButton ></CartButton>
        </Right>

        
        </Wrapper>
 
     
      </Container>)
}