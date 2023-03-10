import { useQuery } from "react-query";
import axios from "axios";
import { Key } from "react";

export interface Ingredient {
  id: Key;
  image: string;
  ingredientName: string;
}

export async function listIngredients() {
  const response = await axios.get(
    `https://api.smartinies.recipes/listIngredients`
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  const ingredients: Ingredient[] = [];
  for (const item of response.data) {
    const ingredient: Ingredient = {
      id: item.id,
      image: item.image,
      ingredientName: item.ingredientName,
    };
    ingredients.push(ingredient);
  }

  return ingredients;
}

export const useIngredients = () =>
  useQuery(["ingredients"], () => listIngredients());
