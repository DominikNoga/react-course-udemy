import { useNavigate } from "react-router-dom";

export default function HomePage() {
  const navigate = useNavigate();

  const onFormSubmit = (event) => {
    event.preventDefault();
    console.log("Form submitted!");
    navigate("/about");
  }
  
  return (
    <main>
      <h1>Home Page</h1>
      <p>Welcome to the home page!</p>
      <p>This is a simple example of a React Router home page.</p>
      <form>
        <button onClick={onFormSubmit}>Go to About Page</button>
      </form>
    </main>
  );
}
