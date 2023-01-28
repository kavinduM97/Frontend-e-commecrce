import axios from "axios";
import React, { useState } from "react";
import { Button, Container, Stack } from "react-bootstrap";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { UserState } from "../../reducers/userReducers";
import { RootState } from "../../store";
import { formatCurrency } from "../../utilities/formatCurrency";

type CartItemProps = {
  item: {
    id: number;
    cartId: number;
    productId: number;
    productName: string;
    totalPrice: number;
    quantity: number;
  };
  index: number;
  setTotal: any;
  total: any;
  productCount: any;
  setProductCount: any;
};

export default function CartItem({
  item,
  index,
  setTotal,
  total,
  productCount,
  setProductCount,
}: CartItemProps) {
  const navigate = useNavigate();

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      let totalPrice = total + item.totalPrice;
      let count = productCount + item.quantity;
      setTotal(totalPrice);
      setProductCount(count);
    } else {
      let totalPrice = total - item.totalPrice;
      let count = productCount - item.quantity;
      setTotal(totalPrice);
      setProductCount(count);
    }
  };

  const removeFromCart = () => {
    var userEmail = "user@example.com";

    axios
      .delete(
        `https://localhost:7075/api/Order/DeleteFromCart/${item.cartId}/${userEmail}`
      )
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    alert("Item deleted from cart successfully");
  };

  return (
    <div>
      {/* <cartContext.Provider value={totalOrderValue}> */}
      <Stack
        direction="horizontal"
        gap={2}
        className="d-flex align-items-center"
      >
        <div className="me-auto">
          <div>
            {item.productName}{" "}
            {item.quantity > 1 && (
              <span className="text-muted" style={{ fontSize: ".65rem" }}>
                x{item.quantity}
              </span>
            )}
          </div>
          <div className="text-muted" style={{ fontSize: ".75rem" }}>
            {formatCurrency(item.totalPrice / item.quantity)}
          </div>
        </div>
        <div> {formatCurrency(item.totalPrice)}</div>
        <div className="col-2 text-center">
          <input type="checkbox" onChange={handleChange} />
        </div>

        <Button
          variant="outline-danger"
          size="sm"
          onClick={() => removeFromCart()}
        >
          &times;
        </Button>
      </Stack>
      {/* </cartContext.Provider> */}
    </div>
  );
}
