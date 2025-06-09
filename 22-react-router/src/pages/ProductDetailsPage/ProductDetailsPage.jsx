import { Link, useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  return (
    <>
      <h1>Product Details Page</h1>
      <p>Details for product ID: {productId}</p>
      <p>This page shows detailed information about the product.</p>
      <Link 
        relative="path" 
        to=".." 
        title="Go back to products page"
      >
          Back
      </Link>
    </>
  )
}
