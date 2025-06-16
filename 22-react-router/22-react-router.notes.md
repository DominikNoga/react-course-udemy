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

### Loaders
We can load the data right when we enter a route using loader property in route definition.
Next using the useLoaderData hook we can read this data
````jsx
const route = {
  element: <EventsPage />,
  loader: async () => {
    const eventsData = await getAllEvents();
    if (!eventsData || eventsData.length === 0) {
      throw new Response("No events found", { status: 404 });
    }
    return {
      events: eventsData.events,
    }; // This will be available to all routes on the same level and all child components/child routes.
  }
}
function EventsPage() {
  const { events } = useLoaderParams();
  return <EventsList events={events} />;
}
````

#### When loader is executed?
It runs when we start navigating to the route, by default the page will be loaded only when the request is finished.
In order to show that the page is loading we can utilize useNavigation hook.
````jsx
export default function EventsPageLayout() {
  const navigation = useNavigation();
  // navigation state 
    // idle - No navigation is currently in progress. The app is at rest.
    // loading - A route navigation is in progress (e.g., the user clicked a <Link> or the navigate() function is being used), and  data is being fetched by a loader.
    // submitting - A form submission is in progress, typically via <Form method="post"> or programmatic submission using 
    //  useFetcher().submit().
  return (
    <>
      <MainNavigation />
      <main>
        { navigation.state  === 'loading' && (
          <p>Loading...</p>
        )}
      </main>
    </>
  )
}
````

#### Error handling
In order to handle an error we have to throw it in the loader function.
We can do it by throwing the Response object with a status and some message.
Next in the place where we want to display this error we can grab the error using 'useRouteError' hook.
Also in order to check if the error is a Response object thrown in loader or some generic error we can use isRouteErrorResponse hook.

````jsx
function ErrorPage() {
  // Get error object
  const error = useRouteError();
  // check if this is a Response type object
  if (isRouteErrorResponse(error)) {
    /* 
      {
        status(HTTP status), statusText(some readable translation of status code), data(message)
      }
    */
    return (
       <>
        <MainNavigation />
        <PageContent title={title}>
          <p>{error.data}</p>
        </PageContent>
      </>
    );
  }

  return (
    <>
      <MainNavigation />
      <PageContent title={title}>
        <p>{message}</p>
      </PageContent>
    </>
  );
}
````

#### Getting route params in loader
````jsx
// when using loader we get 2 props:
// * request -> HTTP request, url, etc
// * params -> all route params
export async function loader({ request, params }) {
  const eventData = await getEventById(params.eventId);
  return {
    event: eventData.event,
  };
}
````

##### useRouteLoaderData
If we want to create same loader for several routes we can define a parent route and assign there all routes that will
need the loader, next we need to assign an id to this parent route and we can now load the data by accessing the
desired loader.
````jsx
// defining a shared loader
const routePath = {
  path: ':eventId',
  id: EVENT_DETAILS_ID,
  loader: eventDetailsLoader,
  children: [
    {
      index: true,
      element: <EventDetailPage />,
    },
    {
      path: "edit",
      element: <EditEventPage />,
    }
  ]
};
// using the data from that loader
export default function EventDetailPage() {
  const { event } = useRouteLoaderData(EVENT_DETAILS_ID);

  return (
    <div>
      <h1>Event Detail Page</h1>
      <EventItem event={event} />
    </div>
  )
}
````

#### Data submission
Instead of handling form submission by attaching to the form onSubmit, we can use
actions, offered by react-router.
It is similar to the loader, but instead of loading the data we are sending it.

````jsx
// action assignment
const routePart = {
  path: "new",
  element: <NewEventPage />,
  action: newEventAction
}
// Action definition
export async function action({request}) {
  // Data gathered from the form where the submit was triggered
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };
  try {
    addEvent(eventData);
    // function available in react-router-dom
    // we need to return something
    return redirect('/events');
  } catch(error) {
    throw new Response(error.message, {status: 500});
  }
}
// form component
function Form() {
  return (
    // This Form component will prevent the default submission behavior and pass the request to the action function
    // Defined in the route
    <Form
      action="/some-route" // we do not pass this param if the action is defined for the current route
      method='POST' 
      className={classes.form} />
  );
}
````

##### Programatic submission
If we want to trigger an action without using a Form component we can use react-router 'submit' method.
Which does exactly the same.
````jsx
function EventItem({ event }) {
  const submit = useSubmit();
  function startDeleteHandler() {
    const proceed = window.confirm('Are you sure?');

    if (proceed) {
      /**
       * first argument would be a form data, but here we do not need it
       * next we have the configuration of the request
       */
      submit(null, {
        method: 'DELETE',
        action: '/other-route' // should be passed when action from not active route is supposed to be used
      });
    }
  }
}
````

##### Validation of the data
If we want to show BE validation messages or any data coming from BE, we can do this by
returning the response object in the action function. Then we can get this data using the
'useActionData' hook.

````jsx
export async function action({request}) {
  const data = await request.formData();
  const eventData = {
    title: data.get('title'),
    image: data.get('image'),
    date: data.get('date'),
    description: data.get('description'),
  };
  try {
    const response  = await addEvent(eventData);
    if (response.status === 422) {
      // direct return of the response
      return response;
    }
    return redirect('/events');
  } catch(error) {
    throw new Response(error.message, {status: 500});
  }
}

const data = useActionData(); // this can be used in component, this holds response from BE
````