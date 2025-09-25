'use client'

import React from 'react'
  
export default function ErrorPage({error}) {
  return  (
    <main>
      <h1>Something went wrong!</h1>
      <p>{error?.message ?? 'Unknown error occurred'}</p>
    </main>
  )
}
