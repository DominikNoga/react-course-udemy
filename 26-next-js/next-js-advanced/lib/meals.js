import sql from 'better-sqlite3';
import slugify from 'slugify';
import xss from 'xss';
import fs from 'node:fs';

const db = sql('meals.db');

export async function getAllMeals() {
  const query = `
    SELECT * FROM meals
  `;
  const meals = db.prepare(query).all();
  return meals;
}

export function getMealBySlug(slug) {
  const query = `
    SELECT * FROM meals WHERE slug = ?
  `;
  const meal = db.prepare(query).get(slug);
  return meal;
}

const handleImageUpload = async (meal) => {
  const { image, slug } = meal;
  const ext = image.name.split('.').pop();
  const filename = `${slug}.${ext}`;
  // upload image to cloud storage
  const stream = fs.createWriteStream(`public/images/${filename}`);
  // create a buffer from the image
  const bufferedImage = await image.arrayBuffer();

  stream.write(Buffer.from(bufferedImage), (error) => {
    if (error) {
      console.error('Error writing file:', error);
      throw new Error('Image upload failed');
    }
  });
  return `/images/${filename}`;
};

export async function createMeal(meal) {
  const query = `
    INSERT INTO meals (creator, creator_email, title, summary, instructions, image, slug)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  meal.slug = slugify(meal.title, { lower: true, strict: true });
  // sanitize instructions to prevent XSS attacks
  // we only sanitize instructions, because other fields are simple text inputs
  // and do not allow HTML input
  // instructions field is a textarea, so it can contain HTML input
  // we use xss library to sanitize the input
  const instructions = xss(meal.instructions);
  try {
    meal.image = await handleImageUpload(meal);
  } catch (error) {
    console.error('Image upload failed:', error);
    return;
  }
  const stmt = db.prepare(query);
  const info = stmt.run(
    meal.creator,
    meal.creator_email,
    meal.title,
    meal.summary,
    instructions,
    meal.image,
    meal.slug
  );
  return info;
}