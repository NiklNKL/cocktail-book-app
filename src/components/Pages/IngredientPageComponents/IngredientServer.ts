import { useQuery } from "react-query";
import axios from "axios";
import { Key, useEffect, useState } from "react";
import { invariant } from "@remix-run/router/dist/history";

export interface Ingredient {
  id: Key;
  image: string;
  ingredientName: string;
}

export async function listIngredients(update: boolean | null) {
  const ingredients: Ingredient[] = [];

  const response = await axios.get(
    `https://api.smartinies.recipes/listIngredients`
  );

  await new Promise((resolve) => setTimeout(resolve, 500));

  for (const item of response.data) {
    const ingredient: Ingredient = {
      id: item.id,
      image: item.image,
      ingredientName: item.ingredientName,
    };
    ingredients.push(ingredient);
  }

  const access_token = localStorage.getItem("access_token");
  if (access_token) {
    const inventory = await axios.get(
      "https://api.smartinies.recipes/inventory",
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + access_token,
        },
      }
    );
    const filteredIngredients = ingredients.filter((ingredient) => {
      return !inventory.data.some(
        (item: Ingredient) => item.id === ingredient.id
      );
    });
    return filteredIngredients;
  }
  return ingredients;
}

export const useIngredients = (update: boolean | null) =>
  useQuery(["ingredients"], () => listIngredients(update));
