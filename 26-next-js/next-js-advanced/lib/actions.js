'use server';

import { redirect } from "next/navigation";
import { createMeal } from "./meals";
import { revalidatePath } from "next/cache";

// this is called a server action
// behind the scenes next.js will create an api route for us
// server action can only be used in server components
// prev state is passed by the useFormState hook
export async function shareMeal(prevState, formData) {
  const meal = {
    creator: formData.get('name'),
    creator_email: formData.get('email'),
    title: formData.get('title'),
    summary: formData.get('summary'),
    instructions: formData.get('instructions'),
    image: formData.get('meal-image'),
  }

  if (!isMealValid(meal)) {
    return {
      message: 'Invalid input - please check your data.',
    }
  }

  await createMeal(meal);
  // revalidate the /meals path to show the new meal
  // but only this path, not even child paths will be revalidated
  revalidatePath('/meals');
  // this will revalidate every route in /meals that uses the layout.js file
  revalidatePath('/meals', 'layout');
  redirect('/meals');
}

function isMealValid(meal) {
  if (
    isInvalidText(meal.title) ||
    isInvalidText(meal.summary) ||
    isInvalidText(meal.instructions) ||
    isInvalidText(meal.creator) ||
    isInvalidText(meal.creator_email) ||
    !meal.creator_email.includes('@') ||
    !meal.image ||
    meal.image.size === 0
  ) {
    return false;
  }
  return true;
}

function isInvalidText(text) {
  return !text || text.trim() === '';
}
