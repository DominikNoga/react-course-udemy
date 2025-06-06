import { useParams } from "react-router-dom";

export default function ProductDetailsPage() {
  const { productId } = useParams();
  return (
    <>
      <h1>Product Details Page</h1>
      <p>Details for product ID: {productId}</p>
      <p>This page shows detailed information about the product.</p>
    </>
  )
}
