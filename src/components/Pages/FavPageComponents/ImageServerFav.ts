import { useQuery } from "react-query";
import axios from "axios";

export interface DrinkSearchParams {
  search: string;
}
export interface Drink {
  id: string;
  name: string;
  imgsrc: string;
}

export async function listDrinks({ search }: DrinkSearchParams) {
  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + localStorage.getItem("access_token"),
  };

  const data = await axios.get("https://api.smartinies.recipes/favourites", {
    headers: headers,
  });

  await new Promise((resolve) => setTimeout(resolve, 500));

  const drinks: Drink[] = [];
  for (const item of data.data) {
    const drink: Drink = {
      name: item.cocktailName,
      imgsrc: item.image,
      id: item.id,
    };
    drinks.push(drink);
  }
  const filteredDrinks = drinks.filter((drink) =>
    drink.name.toLowerCase().includes(search.toLowerCase())
  );
  return filteredDrinks;
}

export const useDrinks = (params: DrinkSearchParams) =>
  useQuery(["drinks", params], () => listDrinks(params));
