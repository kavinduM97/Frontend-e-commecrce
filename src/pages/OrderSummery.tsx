import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Summary } from "../components/atoms/Summary";

export function OrderSummery() {
  let id = useParams();
  let productId = Number(id["productId"]);
  let quantity = Number(id["quantity"]);

  const [dataSet, setProduct] = useState<any>({});
  useEffect(() => {
    axios
      .get(`https://localhost:7075/api/Product/${productId}`)
      .then((res) => {
        let temp = {};
        temp = res.data;
        setProduct({ ...temp });
      })
      .catch((err) => {
        alert(err.message);
      });
  }, []);
  return (
    <>
      <Summary dataSet={dataSet} quantity={quantity} />
    </>
  );
}
