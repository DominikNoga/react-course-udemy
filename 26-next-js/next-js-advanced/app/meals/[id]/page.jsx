import React from 'react'

export default async function MealsDetailPage({ params }) {
  const mealId = await params.id;
  return (
    <div>Meal Detail Page for Meal ID: {mealId}</div>
  )
}
