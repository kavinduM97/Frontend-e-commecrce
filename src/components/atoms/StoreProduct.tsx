import axios from "axios"
import { useState } from "react"
import { Button, Card } from "react-bootstrap"
import { Link, useNavigate } from "react-router-dom"

import { formatCurrency } from "../../utilities/formatCurrency"

type StoreProductProps ={
        productId:number
        description: string
        name: string       
        stock:number       
        imgUrl:string
        price:number
}


export function StoreProduct({productId,name,price,imgUrl,description,stock}:StoreProductProps){
    
  const [quantity,setQuantity] = useState(0);
  const navigate = useNavigate();

  const increaseOrder = () => {
    setQuantity(quantity+1)
  }

  const decreaseOrder = () => {
    setQuantity(quantity-1)
}

const addToCart = () => {

var userEmail = "user@example.com"

if(userEmail == ""){

alert('You need to login first')
navigate('/Login');

}else if(quantity == 0)
{
alert('Add more product')

}else{
    
axios.post(`https://localhost:7075/api/Order/AddToCart/${productId}/${userEmail}/${quantity}`)
    .then(function (response) {
        console.log(response);
     })
    .catch(function (error) {
        console.log(error);
     });

     alert('Product added to cart successfully')
     navigate('/cart')
}  
  
}



    return (
    <Card>
       <Link to={`/product/${productId}`}><Card.Img variant="top" src="https://picsum.photos/1000/667" height="200px" style={{objectFit:"cover"}}/></Link> 
        <Card.Body className="d-flex flex-column">
        <Card.Title className="d-flex justify-content-between align-items-baseline mb-4">
          <span className="fs-2">{name}</span>
          <span className="ms-2 text-muted">{formatCurrency(price)}</span>
        </Card.Title>
  
        <div className="mt-auto">

<div className="d-grid gap-2">
<div
className="d-flex align-items-center flex-column"
style={{ gap: ".5rem" }}
>
<div
className="d-flex align-items-center justify-content-center"
style={{ gap: ".5rem" }}
>
{/* <Button variant="warning">-</Button> */}
{quantity<=0 ?
                 <div>                                       
                     <Button variant="warning" disabled>-</Button>
                 </div>
                 :
                 <div>
                     <Button variant="warning" onClick={decreaseOrder}>-</Button>                                        
        </div>}
<div>
 <span className="fs-3">{quantity}</span> in cart
</div>
{/* <Button variant="warning" >+</Button> */}
{quantity>=stock ?
                 <div>                                                                              
                     <Button variant="warning" disabled>+</Button>
                 </div>
                 :
                 <div>
                     <Button variant="warning" onClick={increaseOrder}>+</Button>                                        
       </div>}
</div>

</div>


<Button className="w-100"  onClick={addToCart}>
Add To Cart
</Button>




</div>

</div>






      </Card.Body>
    </Card>)
}