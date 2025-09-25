'use server';

import { createMeal } from "./meals";

// this is called a server action
// behind the scenes next.js will create an api route for us
// server action can only be used in server components
export async function shareMeal(formData) {
  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('meal-image'),
  }

  await createMeal(meal);
}