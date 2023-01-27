import axios from "axios"
import { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"
import styled from "styled-components"

import { formatCurrency } from "../../utilities/formatCurrency"


// type SingleProductProps ={
//     id:number
//     name:string
//     price:number
//     imgUrl:string
// }

type ProductProps = {

    dataSet:{
        productId:number
        description: string
        name: string       
        stock:number       
        imgUrl:string
        price:number
}
}
const Container = styled.div``;

const Wrapper = styled.div`
  padding: 50px;
  display: flex;
  flex-wrap: wrap;
  @media (max-width: 768px) {
    flex-direction: column;
  }
`;

const ImgContainer = styled.div`
  flex: 1;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Image = styled.img`
  width: 100%;
  height: 70vh;
  object-fit: cover;
  
`;

const InfoContainer = styled.div`
  flex: 1;
  padding: 0px 50px;
  @media (max-width: 768px) {
    width: 100%;
    padding: 0px;
    text-align: center;
  }
`;

const Title = styled.h1`
  font-weight: 600;
`;

const Desc = styled.p`
  margin: 20px 0px;
`;

const Price = styled.span`
  font-weight: 100;
  font-size: 40px; 
`;

export function SingleProduct({dataSet} : ProductProps){
    

      //const quantity = getItemQuantity(dataSet.productId)


      const [quantity,setQuantity] = useState(0);
        const navigate = useNavigate();

        const increaseOrder = () => {
          setQuantity(quantity+1)
        }

        const decreaseOrder = () => {
          setQuantity(quantity-1)
      }

const addToCart = () => {

  var userEmail = "user@example.com"

  if(userEmail == ""){

      alert('You need to login first')
      navigate('/Login');

  }else if(quantity == 0)
  {
      alert('Add more product')

  }else{
          
      axios.post(`https://localhost:7075/api/Order/AddToCart/${dataSet.productId}/${userEmail}/${quantity}`)
          .then(function (response) {
              console.log(response);
           })
          .catch(function (error) {
              console.log(error);
           });

           alert('Product added to cart successfully')
           navigate('/cart')
 }
}
    return (
        <Card>
        <Container>
     
        <Wrapper>
          <ImgContainer>
            <Image src='' />
          </ImgContainer>
          <InfoContainer>
            <Title>{dataSet.name}</Title>
            <Desc>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
              venenatis, dolor in finibus malesuada, lectus ipsum porta nunc, at
              iaculis arcu nisi sed mauris. Nulla fermentum vestibulum ex, eget
              tristique tortor pretium ut. Curabitur elit justo, consequat id
              condimentum ac, volutpat ornare.
            </Desc>
            <Price>{formatCurrency(dataSet.price)}</Price>
          
            
                   <div className="mt-auto">

                   <div className="d-grid gap-2">
                   <div
                className="d-flex align-items-center flex-column"
                style={{ gap: ".5rem" }}
              >
                <div
                  className="d-flex align-items-center justify-content-center"
                  style={{ gap: ".5rem" }}
                >
                  {/* <Button variant="warning">-</Button> */}
                  {quantity<=0 ?
                                    <div>                                       
                                        <Button variant="warning" disabled>-</Button>
                                    </div>
                                    :
                                    <div>
                                        <Button variant="warning" onClick={decreaseOrder}>-</Button>                                        
                           </div>}
                  <div>
                    <span className="fs-3">{quantity}</span> in cart
                  </div>
                  {/* <Button variant="warning" >+</Button> */}
                  {quantity>=dataSet.stock ?
                                    <div>                                                                              
                                        <Button variant="warning" disabled>+</Button>
                                    </div>
                                    :
                                    <div>
                                        <Button variant="warning" onClick={increaseOrder}>+</Button>                                        
                          </div>}
                </div>
       
              </div>
                   <Link 
                        
                        role="button"
                        to="/cart"
                        > 
                   <Button className="w-100" variant="success" >
                 Buy Now
              </Button></Link>
            
              <Button className="w-100"  onClick={addToCart}>
               Add To Cart
              </Button>
       
   
               
            
             </div>
            
          </div>
           
          </InfoContainer>
        </Wrapper>
    
      </Container></Card>)
}