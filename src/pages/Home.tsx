import axios, { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import { StoreProduct } from "../components/Organisms/StoreProduct";
import AllProducts from "../data/items.json";

export function Home() {
  const [dataSet, setDataSet] = useState<any[]>([]);

  let products;

  useEffect(() => {
    axios
      .get("https://localhost:7075/api/Product")
      .then((res) => {
        products = res.data;
        setDataSet([...products]);
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);

  console.log(dataSet);
  return (
    <>
      {/* <Row md={2} xs={1} lg={3} className="g-3">
        {AllProducts.map(item=>(
            <Col key={item.id}>
                <StoreProduct {...item} />
            </Col>
        ))}
        
    </Row> */}

      <Row xs={1} md={2} lg={4} className="g-3">
        {dataSet.map((item) => (
          <Col key={item.productId}>
            <StoreProduct {...item} />
          </Col>
        ))}
         
      </Row>
    </>
  );
}
