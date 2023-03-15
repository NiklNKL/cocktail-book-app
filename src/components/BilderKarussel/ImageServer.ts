import { useQuery } from "react-query";
import axios from "axios";

export interface DrinkSearchParams {
  search: string;
  checked: boolean;
}
export interface Drink {
  id: string;
  name: string;
  imgsrc: string;
}

export async function listDrinks({ search, checked }: DrinkSearchParams) {
  let response = null;

  if (search != "") {
    response = await axios.get(
      `https://api.smartinies.recipes/list?contains=${search}`
    );
  } else if (checked) {
    response = await axios.get("https://api.smartinies.recipes/listPossible", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + localStorage.getItem("access_token"),
      },
    });
    console.log("is pressed");
  } else {
    response = await axios.get("https://api.smartinies.recipes/randomList");
  }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const drinks: Drink[] = [];
  for (const item of response.data) {
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
