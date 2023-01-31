import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Nav, Row, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import styled from "styled-components";
import CartItems from "../components/atoms/CartItems";
import { UserState } from "../reducers/userReducers";
import { RootState } from "../store";
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

const Title = styled.h2`
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
  border: 0.5px solid lightgray;
  border-radius: 10px;
  background-color: #f2cd5c;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

const Product = styled.div`
  font-weight: 600;
  padding-left: 10px;
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
  background-color: #f2921d;
  border: 0.5px solid lightgray;
  border-radius: 10px;
  padding: 20px;
  margin-left: 20px;
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

export function Cart() {
  const [total, setTotal] = useState<any>(0);
  const [productCount, setProductCount] = useState<any>(0);
  const [dataSet, setDataSet] = useState<any[]>([]);
  const [cartProductList, setcartProductList] = useState<any[]>([]); //to colect checked product ids

  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo } = userLogin;
  const Email = userInfo ? userInfo.Email : null;
  const navigate = useNavigate();
  let userEmail = Email;
  //console.log(userEmail);

  const handleChange = () => {
    //var userEmail = Cookies.get('user_email')

    axios
      .post(
        `https://localhost:7075/api/Order/placeorderbyCart/${userEmail}`,
        cartProductList
      )
      .then((res) => {
        //console.log("nbot");

        let state = res.data.state;

        if (state === true) {
          alert("order placed successfully");
          navigate("/");
        } else {
          alert("order placed Faild");
          //console.log("dsfdf");
          navigate("/");
        }
      })
      .catch((err) => {
        alert("order placed Faild");
        console.log("dsfdf");
        navigate("/");
      });
  };
  if (!userEmail) {
    alert("You have to login first");
    navigate("/login");
  } else {
    useEffect(() => {
      axios
        .get(
          `https://localhost:7075/api/Order/GetAllProductsInCart/${userEmail}`
        )
        .then((res) => {
          let products;
          products = res.data;
          setDataSet([...products]);
        })
        .catch((err) => {
          alert("No cart items yet..");
        });
    }, []);
  }

  return (
    <div>
      <Container>
        <Wrapper>
          <Title>Cart of {Email}</Title>
          <Top>
            {" "}
            <Nav.Link to="/" as={NavLink}>
              <TopButton>CONTINUE SHOPPING</TopButton>
            </Nav.Link>
          </Top>
          <Bottom>
            <Info>
              <Product>
                <Stack gap={2}>
                  {dataSet.map((item, index) => (
                    <Row key={item.id} className="py-2">
                      <CartItems
                        item={item}
                        index={index}
                        setTotal={setTotal}
                        total={total}
                        productCount={productCount}
                        setProductCount={setProductCount}
                        setcartProductList={setcartProductList}
                        cartProductList={cartProductList}
                      />
                    </Row>
                  ))}
                </Stack>
              </Product>
              <Hr />
            </Info>
            <Summary>
              <SummaryTitle>ORDER SUMMARY</SummaryTitle>

              <div className="ms-auto fw-bold fs-5">
                <SummaryItemText> Total </SummaryItemText>
                {formatCurrency(total)}
              </div>

              <TopButton
                onClick={handleChange}
                style={{ width: "100%", marginTop: "30px" }}
              >
                CHECKOUT NOW
              </TopButton>
            </Summary>
          </Bottom>
        </Wrapper>
      </Container>
          
    </div>
  );
}

export default Cart;
