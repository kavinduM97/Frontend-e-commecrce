import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row, Stack } from "react-bootstrap";
import styled from "styled-components";
import CartItems from "../components/atoms/CartItems";
import { formatCurrency } from "../utilities/formatCurrency";





const Container = styled.div`
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Wrapper = styled.div`
  padding: 20px;

  @media (max-width: 768px) {
    padding: 10px;
  }
`;

const Title = styled.h1`
  font-weight: 400;
  text-align: center;

  @media (max-width: 768px) {
    font-size: 22px;
  }
`;

const Top = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px;
  @media (max-width: 768px) {
    flex-wrap: wrap;
    justify-content: center;
  }
`;

const TopButton = styled.button`
  
  font-weight: 600;
  cursor: pointer;

  padding: 10px;

  @media (max-width: 768px) {
    width: 100%;
    margin-bottom: 10px;
  }
`;



const Bottom = styled.div`
  display: flex;
  justify-content: space-between;

  @media (max-width: 768px) {
    flex-wrap: wrap;
  }
`;

const Info = styled.div`
  flex: 3;

  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Product = styled.div`
font-weight: 600;
  display: flex;
  justify-content: space-between;
  padding-right: 30px;

  @media (max-width: 768px) {
    padding-right: 0;
  }
`;


const Hr = styled.hr`
  background-color: #eee;
  border: none;
  height: 1px;
`;

const Summary = styled.div`
  flex: 1;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin-left:20px;
  height: 50vh;
  @media (max-width: 768px) {
    width: 100%;
    margin-top: 20px;
    margin-left: 0;
  }
`;

const SummaryTitle = styled.h1`
  font-weight: 200;
  padding-bottom: 30px;

  @media (max-width: 768px) {
    font-size: 18px;
  }
`;



const SummaryItemText = styled.span`
  @media (max-width: 768px) {
    font-size: 14px;
  }
`;











export function Cart(){
    
  const [total,setTotal] = useState<any>(0)
  const [productCount,setProductCount] = useState<any>(0)
  const[dataSet,setDataSet]=useState<any[]>([])

  let userEmail = 'user@example.com'

  useEffect(() => { 
    axios.get(`https://localhost:7075/api/Order/GetAllProductsInCart/${userEmail}`).then((res)=>{

    let products
    products=res.data
    setDataSet([...products]);
      
     }).catch((err)=>{
       alert(err.message)
     })
  }, []);
  
  return (
    
    <div>
      

      <Container>
     
     <Wrapper>
       <Title>Cart</Title>
       <Top>
         <TopButton>CONTINUE SHOPPING</TopButton>
         
        
       </Top>
       <Bottom>
         <Info>
           <Product>
                    <Stack gap={3}>
              {dataSet.map((item,index) => (
         

           <Row key={item.id} className="py-2">
             <CartItems item={item} index={index} setTotal={setTotal} total={total} productCount={productCount} setProductCount={setProductCount}/>
           </Row>

       ))}
  
       </Stack>
           </Product>
           <Hr />
           
         </Info>
         <Summary>
           <SummaryTitle>ORDER SUMMARY</SummaryTitle>
          
         
            

             <div className="ms-auto fw-bold fs-5">
             <SummaryItemText>   Total{" "}</SummaryItemText>
           {formatCurrency (total)}
           
         </div>
        
          <TopButton style={{width: "100%" , marginTop:"30px"}}>CHECKOUT NOW</TopButton>
         </Summary>
       </Bottom>
     </Wrapper>
    
   </Container>
    
    </div>
  )
}

export default Cart;