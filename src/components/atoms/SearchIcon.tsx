import styled from "styled-components";
import Search from "@mui/icons-material/Search"
import { Button, Form } from "react-bootstrap";
import { useState } from "react";
import { useNavigate } from "react-router-dom";



const SearchContainer = styled.div`
  border: 0.5px solid lightgray;
  display: flex;
  align-items: center;
  margin-left: 25px;
  padding: 5px;
  
  @media (max-width: 768px) {
    margin-left: 0px;
    margin-bottom: 10px;
    width: 100%;
  }
`;


const Input = styled.input`
  border: none;
  @media (max-width: 768px) {
    width: 100%;
  }
`;

export function SerarchIcon(){


  const [searchName,setSearchnName] = useState("");
    const navigate = useNavigate();

    const searchProduct = (e:any) => {

        e.preventDefault()

        navigate(`/SearchProduct/${searchName}`);
        
    }

    return (<>   
    <SearchContainer>
      <Form method='post' onSubmit={(e) => searchProduct(e)}>
        <Input placeholder="Search" value={searchName} onChange={(e) => setSearchnName(e.target.value)} />
        <Button type="submit" variant="light">
     
        <Search style={{ color: "gray", fontSize: 16 }} />
        </Button> 
        </Form>
      </SearchContainer></>)
}