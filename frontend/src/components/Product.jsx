import React from 'react'
import {Card} from 'react-bootstrap'
import Rating from './Rating'
import {Link} from 'react-router-dom'

const Product = ({product}) => {

  return (
    <Card className='my-3 p-3' variant="top">
        <Link to={`/product/${product._id}`} style={{textDecoration:'none'}}>
            <Card.Img src={`http://localhost:8000/${product.image}`} height='240'/>
        </Link>
        <Card.Body>
        <Link href={`/product/${product._id}`} style={{textDecoration:'none'}}>
           <Card.Title as="div">
            <strong>{product?.name}</strong>
           </Card.Title>
        </Link>
        <Card.Text as="div">
            <div className='my-3'>
               <Rating value={product.rating} text={`${product?.numReviews} reviews`} color={'#f8e825'}/>
            </div>
        </Card.Text>
        <Card.Text as="div">
            <div className='h5'>
               ${product?.price}
            </div>
        </Card.Text>
        </Card.Body>
    </Card>
  )
}

export default Product

