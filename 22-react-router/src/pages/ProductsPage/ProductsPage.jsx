import React from 'react'
import { Link } from 'react-router-dom'

const PRODUCTS = [
  { id: 1, name: 'Product 1' },
  { id: 2, name: 'Product 2' },
  { id: 3, name: 'Product 3' }
];

export default function ProductsPage() {
  return (
    <>
      <h1>The Products Page</h1>
      <ul>
        {
          PRODUCTS.map(product => (
            <li key={product.id}>
              <Link to={`/products/${product.id}`}>{product.name}</Link>
            </li>
          ))
        }
      </ul>
    </>
  )
}
