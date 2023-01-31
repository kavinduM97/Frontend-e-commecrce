import axios from "axios";
import { useState } from "react";
import { Button, Card } from "react-bootstrap";
import { useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { UserState } from "../../reducers/userReducers";
import { RootState } from "../../store";

import { formatCurrency } from "../../utilities/formatCurrency";
import { AddtoCart } from "../molecules/AddtoCart";

type StoreProductProps = {
  productId: number;
  description: string;
  name: string;
  stock: number;
  imgUrl: string;
  price: number;
};

export function StoreProduct({
  productId,
  name,
  price,
  imgUrl,
  description,
  stock,
}: StoreProductProps) {
  const [quantity, setQuantity] = useState(0);
  const navigate = useNavigate();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo } = userLogin;
  const Email = userInfo ? userInfo.Email : null;

  return (
    <Card>
      <Link to={`/product/${productId}`}>
        <Card.Img
          variant="top"
          src="https://picsum.photos/1000/667"
          height="200px"
          style={{ objectFit: "cover" }}
        />
      </Link>
      <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
        <AddtoCart
          productId={productId}
          description={description}
          name={name}
          stock={stock}
          imgUrl={imgUrl}
          price={price}
        ></AddtoCart>
      </Card.Body>
    </Card>
  );
}
