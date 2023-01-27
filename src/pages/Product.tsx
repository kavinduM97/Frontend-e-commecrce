import axios from "axios";
import { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap"
import { useParams } from "react-router-dom";
import { SingleProduct } from "../components/atoms/SingleProduct";
import AllProducts from "../data/items.json"

export const Product = () => {
    //const filteredItem = AllProducts.filter((item) => item.id === 2)[0];
    let id = useParams();


   const[dataSet,setProduct]=useState<any>({});

  let productId = Number(id['productId'])
  
  
  useEffect(() => { 
    axios.get(`https://localhost:7075/api/Product/${productId}`).then((res)=>{

    let temp={}
      temp=res.data
      setProduct({...temp});
      
     }).catch((err)=>{
       alert(err.message)
 })
},[]);

//console.log(dataSet)
    return (<>
    <Row >
            
                <SingleProduct dataSet={dataSet} />
           
    </Row>
    </>
    )
} 