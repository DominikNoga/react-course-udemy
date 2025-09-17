# Deploying Apps
In order to deploy an app we need to follow few steps:
1. Write the app code
2. Test the application
3. Optimize the application
4. Build the application
5. Deploy the application

## Optimizing the Application
The optimization can be split into few types:
- First we can optimize the speed of our application by writing efficient code, that minimizes the number of re-renders and avoids unnecessary computations. We can use tools like React Profiler to identify performance bottlenecks in our application.
- Second we can optimize the size of our application by minimizing the bundle size. This can be achieved by using techniques like code splitting, tree shaking, and minification. We can use tools like Webpack Bundle Analyzer to analyze the bundle size and identify areas for improvement.
- Third we can optimize the loading time of our application by using techniques like lazy loading, preloading, and caching. We can use tools like Lighthouse to analyze the loading time and identify areas for improvement.

### Lazy Loading
When we want to run our application, we need to load all the code required for the app to run.
So when using any imports, the entire code of the imported module is loaded into the bundle. So if our whole app is in a single bundle, the entire code of the app is loaded when the app is loaded. It is not a problem for small apps, but for larger apps, it can lead to longer loading times and slower performance.
Therefore, we can use lazy loading to load only the code that is required for the current view.

````jsx
// for example, the following code will load the entire BlogPage component when the app is loaded
// but we only need the home page to be loaded initially, so we can use lazy loading to load the BlogPage component only when it is needed
const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          { index: true, element: <BlogPage />, loader: postsLoader },
          { path: ':id', element: <PostPage />, loader: postLoader },
        ],
      },
    ],
  },
]);
````
In order to implement lazy loading, we can use the `React.lazy` function to load the component only when it is needed. We also need to use the `Suspense` component to show a fallback UI while the component is being loaded. We also add dynamic import.

````jsx
const BlogPage = lazy(() => import('./pages/Blog'));
const PostPage = lazy(() => import('./pages/Post'));

const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: 'posts',
        children: [
          {
            index: true,
            element: (<Suspense fallback={<p>Loading...</p>}><BlogPage /></Suspense>),
            loader: () => import('./pages/Blog').then(module => module.loader()) 
          },
          {
            path: ':id',
            element: (<Suspense fallback={<p>Loading...</p>}><PostPage /></Suspense>),
            loader: (meta) => import('./pages/Post').then(module => module.loader(meta))
          },
        ],
      },
    ],
  },
]);
````

### Building the Application
Transforming the code into a format that can be run in a web browser. This typically involves using a build tool like Webpack or Vite to bundle the code and its dependencies into a single file or set of files that can be served to users.
This process may also involve optimizing the code for performance, such as minifying the code to reduce its size and improve loading times. The build tool will typically generate a production-ready version of the application that can be deployed to a web server or hosting platform.
The command depends on our setup and the tool we are using, but typically it is something like `npm run build` or `yarn build`.

### Deploying the Application
Once the application is built, we can deploy it to a web server or hosting platform. This typically involves uploading the built files to a server or using a deployment tool like Netlify, Vercel, or Heroku to automate the deployment process. 
React app after building is just a set of static files (HTML, CSS, JS) that can be served by any web server.