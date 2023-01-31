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
  setcartProductList: any;
  cartProductList: any;
};

export default function CartItem({
  item,
  index,
  setTotal,
  total,
  productCount,
  setProductCount,
  setcartProductList,
  cartProductList,
}: CartItemProps) {
  const navigate = useNavigate();
  const userLogin = useSelector<RootState, UserState>(
    (state: RootState) => state.userLogin
  );

  const { userInfo } = userLogin;
  const Email = userInfo ? userInfo.Email : null;

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.checked) {
      let totalPrice = total + item.totalPrice;
      let count = productCount + item.quantity;
      setTotal(totalPrice);
      setProductCount(count);
      setcartProductList([...cartProductList, item.cartId]);
    } else {
      let totalPrice = total - item.totalPrice;
      let count = productCount - item.quantity;
      let itemId = item.cartId;
      setTotal(totalPrice);
      setProductCount(count);
      //remove item when unchecked
      var index = cartProductList.indexOf(itemId);
      cartProductList.splice(index, 1);
      setcartProductList(cartProductList);
    }
  };

  const removeFromCart = () => {
    var userEmail = Email;

    axios
      .delete(
        `https://localhost:7075/api/Order/DeleteFromCart/${item.cartId}/${userEmail}`
      )
      .then(function (response) {
        console.log(response);
        alert("Item deleted from cart successfully");
      })
      .catch(function (error) {
        console.log(error);
      });
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
