import {
  Facebook,
  Instagram,
  MailOutline,
  Phone,
  Pinterest,
  Room,
  Twitter,
} from "@mui/icons-material";
import styled from "styled-components";


const Container = styled.div`
height: 60px;
align-items: center;

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
flex: 1;
display: flex;
align-items: center;

@media (max-width: 768px) {
  width: 100%;
  text-align:center;
}
`;


const Center = styled.div`
flex: 1;
align-items: center;

@media (max-width: 768px) {
  width: 100%;
  text-align:center;
}
`;
const Logo = styled.h2`
   color:white
`;
const Right = styled.div`
  flex: 1;
  display: flex;
  align-items: center;
  justify-content: center
  
  @media (max-width: 768px) {
    width: 100%;
    text-align:center;
  }
`;
  

  
  
  
  const SocialContainer = styled.div`
    display: flex;
    align-items: center;
    justify-content: center
    @media (max-width: 768px) {
    width: 100%;
    text-align:center;
  }
  `;
  
  const SocialIcon = styled.div`
    width: 40px;
    height: 40px;
    border-radius: 50%;
    color: white;
    background-color: #${(props) => props.color};
    display: flex;
    align-items: center;
    justify-content: center;
    margin-right: 20px;
    @media (max-width:768px){
    width: 30px;
    height: 30px;
    margin-right: 10px;
  }
  `;
  
  const ContactItem = styled.div`
  font-size: 18px;
  display: flex;
  align-items: center;
  color:white;
  @media (max-width:768px){
    font-size: 12px;
  }
`;

 
  const Footer = () => {
    return (
      <Container className="bg-secondary" >
        <Wrapper>
        <Left>
          <Logo>storeLK.</Logo>
         
        
        </Left>
       <Center>
       <SocialContainer>
            <SocialIcon color="3B5999">
              <Facebook />
            </SocialIcon>
            <SocialIcon color="E4405F">
              <Instagram />
            </SocialIcon>
            <SocialIcon color="55ACEE">
              <Twitter />
            </SocialIcon>
            <SocialIcon color="E60023">
              <Pinterest />
            </SocialIcon>
          </SocialContainer>
       </Center>
        <Right>
        <ContactItem>
          <Phone style={{marginRight:"10px"}}/> 0712988053
        </ContactItem>
         
        </Right>
        </Wrapper>
      </Container>
    );
  };
  
  export default Footer;
