import axios from "axios";
import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { StoreProduct } from "../Organisms/StoreProduct";

export default function SearchProduct() {
  let searchName = useParams();
  const [dataSet, setProduct] = useState<any[]>([]);
  const navigate = useNavigate();

  let Name = searchName["searchName"];

  useEffect(() => {
    axios
      .post("https://localhost:7075/api/Product/SearchProduct", {
        name: `${Name}`,
      })
      .then((res) => {
        let temp = res.data;
        setProduct([...temp]);
      })
      .catch((err) => {
        navigate("/");
      });
  }, []);

  return (
    <div className="product">
      <Row xs={1} md={2} lg={4} className="g-3">
        {dataSet.map((item) => (
          <Col key={item.productId}>
            <StoreProduct {...item} />
          </Col>
        ))}
      </Row>
         
    </div>
  );
}
