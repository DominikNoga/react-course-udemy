# Next.js
Next.js is a React framework that allows developers to build full-stack applications.

## Creating a Next.js App
docs: https://nextjs.org/docs/app/getting-started/installation

```bash
npx create-next-app@latest <project-name>
```

## Next.js file structure
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

## Server components
Normal React component, when it comes to syntax, but it is executed on the server.
Which means that it runs on backed, for example the console.log won't be shown in the browser, but in the terminal.
The server component html is sent to the browser.

### Pages
When navigating between pages we should use next/Link component. It allows us to use the SPA routing without reloading.
