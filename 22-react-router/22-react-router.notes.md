# React routing
* Routing -> Loading different content on the screen based on the url.
* Traditional app just gets different html for different route from the server.
* SPA's -> Loads just one index.html file and handles routing inside the client code.
  * Then we are loading different React components based on routes
  * To make this available we use react-router-dom package

## React router usage
In order to add routing to our project we need to follow 3 steps:
1. Define suppored routes: urls and components.
2. Activate router and load components.
3. Provide options to navigate between routes and make sure components are available.

### Defining routes and providing them
````jsx
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/about",
    element: <AboutPage />,
  }
]);

function App() {
  return <>
    <RouterProvider router={router} />;
  </>
}
````

### Defining layout present on every route
When we want to provide a layout which will be used all over the app, we can set it as the parent route for, all 
our routes.

````jsx
const Layout = () => {
  return (
     <>
      <Nav />
      <main>
        {/* Imported from router dom, here the content will go */}
        <Outlet /> 
      </main>
      <Footer />
    </>
  )
}

const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    // We can handle errors by passing custom error elements, when it is passed to the main route it will be loaded for not existing routes.
    errorElement: <ErrorPage />,
    children: [
      {
        path: "/",
        element: <HomePage />,
      },
      {
        path: "/about",
        element: <AboutPage />,
      }
    ],
  },
]);
````

### Navigating between routes
#### Links navigation
In order to navigate between routes we can use provided components from react-router-dom:
* Link -> uses a 'to' prop instead of href
* NavLink -> is like Link but with extra props, has access to isActive/end/etc..
* We do not use <a href="/"></a> approach because it reloads the page and re-fetches the data.

````jsx
export default function Nav() {
  return (
    <ul className={classes.list}>
      <li>
        <NavLink 
          to="/" 
          className={({isActive}) => `${isActive ? classes.active : undefined}`}
          end // 'end' ensures that the link is only active when the path is exactly "/"
        >
          Home
        </NavLink>
      </li>
      <li>
        <NavLink 
          to="/about" 
          className={({isActive}) => `${isActive ? classes.active : undefined}`}
        >
          About
        </NavLink>
      </li>
    </ul>
  )
}
````
#### Programatic navigation
Programatic navigation is handled using useNavigation built-in hook.
````jsx
const navigate = useNavigate();

const onFormSubmit = (event) => {
  event.preventDefault();
  console.log("Form submitted!");
  navigate("/about");
}
````

### Dynamic navigation
Dynamic navigation is useful when we want to render the same route, but with different content based
on the route params. For example when creating products details page we want to have a different product displayed based on the selected route.
````jsx
const router = createBrowserRouter([
  {
    // ...other props
    children: [
      // ...other routes
      {
        // This ':' defines a dynamic part of the route
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      }
    ],
  },

]);
````
Now in order to use this param we can use a hook provided by react-router-dom
````jsx
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
````

### Paths (Lesson 354)
There are two types of paths:
* Absolute paths -> They are started with '/', the absolute path will be always '/path_name'
* Relative -> Those are started without '/', and will be relative to the parent routes. The relative path will be:
'/parent_path/relative_path_name'
````jsx
const router = createBrowserRouter([
  {
    path: '/root',
    children: [
      {
        path: '', // will be available under /root/
        element: <HomePage />
      },
      {
        path: 'products', // /root/products
        element: <ProductsPage />
      },
      {
        path: '/about', // /about -> NO /root
        element: <AboutPage />
      }
    ]
  }
])
````
<b>This also applies to links!!!</b>
So we can just remove the leading '/' from the 'to' prop and then the link will be appended to the currently active route.

#### Relative prop
It is possible to add a 'relative' prop to the link component, it works well with '..' path.
This prop specifies wether we will navigate relatively to the path or to the route definition.
````jsx
const router = createBrowserRouter([
  {
    path: "/",
    children: [
      {
        path: "",
        element: <HomePage />,
      },
      {
        path: "products",
        element: <ProductsPage />,
      },
      {
        path: "/products/:productId",
        element: <ProductDetailsPage />,
      }
    ],
  },
]);
// In ProductDetailsPage
return (
  <>
    // This is relative to the route path so we will move back 1 route to the '/products'
    <Link to=".." relative="path"/>
    // This is relative to the route definition so we will move to the '/' route which is parent of products/id
    <Link to=".." relative="route"/>
  </>
)
````

#### Default route
setting index prop to true will set the route as default, and will be loaded when a parent route is entered.

````jsx
const router = createBrowserRouter([
  {
    path: "/",
    element: <Layout />,
    errorElement: <ErrorPage />,
    children: [
      {
        index: true, // This will render the HomePage as the default route
        element: <HomePage />,
      }
      // ...REST OF THE ROUTES
    ]
  }
````
