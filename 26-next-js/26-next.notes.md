# Next.js
Next.js is a React framework that allows developers to build full-stack applications.

## Creating a Next.js App
docs: https://nextjs.org/docs/app/getting-started/installation

```bash
npx create-next-app@latest <project-name>
```

## Next.js file structure
- docs: https://nextjs.org/docs/app/getting-started/project-structure#colocation
- For routing next uses the file system
- the main folder is /app
  - the routes are created out of the folders inside the /app
![alt text](image.png)
- there are some special file names
  - page.js -> tells next to render this component under a given route.
    - for example when we will add route /about/page.jsx
```jsx
// This will render under /about
export default function AboutPage() {
  return (
    <main>
      <h1>About Page</h1>
      <p>This is the about page of our application.</p>
    </main>
  )
}

```
  - layout.js -> it wrapps the page
    - in root layout we use html and body elements
    - we do not add head, instead we add metadata, which will work as head. The name is reserved
    - each next project needs a root layout
    - each route can have it's own layout, but it is not required
```jsx
import './globals.css'

export const metadata = {
  title: 'NextJS Course App',
  description: 'Your first NextJS app!',
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
```
  - icon.{png, jpg, etc} -> This file will be used as a favicon (the small one in the navbar)
  - not-found.js => Fallback page for "Not Found" errors (thrown by sibling or nested pages or layouts)
  - error.js => Fallback page for other errors (thrown by sibling pages or nested pages or layouts)
  - loading.js => Fallback page which is shown whilst sibling or nested pages (or layouts) are fetching data
  - route.js => Allows you to create an API route (i.e., a page which does NOT return JSX code but instead data, e.g., in the JSON format)

- All routes are located in the /app folder, we can safely store other components in the app folder, and do not be scared, that they will have own routes,
  because the page.js component or route.js is needed. 
- if we want to make sure component is not routed. We can make it private by adding _name
- we can create route groups by setting () around the group name. It can help with the organization and it won;t influence the url.
- We can add a dynamic routes, by wrapping a folder name with square brackets []
![alt text](image-1.png)
````jsx
import React from 'react'

// Params is a special prop provided by Next.js for dynamic routes
// It contains the dynamic segments of the URL
// In this case, params.id will hold the value of the dynamic segment [id]
export default function BlogPostPage({ params }) {
  console.log(params.id);
  return (
    <main>
      <h1>Blog Post</h1>
    </main>
  )
}
````

## Server components
Normal React component, when it comes to syntax, but it is executed on the server.
Which means that it runs on backed, for example the console.log won't be shown in the browser, but in the terminal.
The server component html is sent to the browser.

### Pages
When navigating between pages we should use next/Link component. It allows us to use the SPA routing without reloading.


## Next.js custom components
Next framework is offering us a lot of built in components. They can be helpful for a lot of reasons, like performance or other.

### Link
Instead of using <a></a> tag we can use <Link> component that allows to use SPA navigation

### Image
docs: https://nextjs.org/docs/app/api-reference/components/image
For example allows to lazy load the image by default.

```jsx
 <Image 
  src={logoImg.src}
  alt="A plate with food on it"
  width={50}
  height={50}
/>
```