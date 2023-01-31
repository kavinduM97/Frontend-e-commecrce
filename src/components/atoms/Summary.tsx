// Summary.tsx
import axios from "axios";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import styled from "styled-components";
import { UserState } from "../../reducers/userReducers";
import { RootState } from "../../store";
import { formatCurrency } from "../../utilities/formatCurrency";
import TopButton from "./TopButton";

const SummaryWrapper = styled.div`
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

type SumProp = {
  dataSet: {
    productId: number;
    description: string;
    name: string;
    stock: number;
    imgUrl: string;
    price: number;
  };
  quantity: number;
};

export function Summary({ dataSet, quantity }: SumProp) {
  const navigate = useNavigate();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo } = userLogin;
  const Email = userInfo ? userInfo.Email : null;
  var total = quantity * dataSet.price;
  const handleChange = () => {
    axios
      .post(
        `https://localhost:7075/api/Order/PlaceOrder/${dataSet.productId}`,
        {
          email: `${Email}`,
          quantity: `${quantity}`,
        }
      )
      .then((res) => {
        let temp = res.data.state;

        if (temp == true) {
          alert("order placed successfully");
          navigate("/");
        } else {
          alert("order placed Faild");
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return (
    <SummaryWrapper>
      <SummaryTitle>ORDER SUMMARY</SummaryTitle>

      <div className="ms-auto fw-bold fs-5">
        <div>
          {" "}
          <SummaryItemText> {dataSet.name} </SummaryItemText>
        </div>
        <div>
          {" "}
          <h6> Qunatity = {quantity} </h6>
        </div>{" "}
        <hr />
        <SummaryItemText> Total = {formatCurrency(total)}</SummaryItemText>
      </div>
      <div>
        <TopButton
          name="CHECKOUT NOW"
          onClick={handleChange}
          styles={{ width: "100%", marginTop: "10px" }}
        />
      </div>
    </SummaryWrapper>
  );
}
