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
