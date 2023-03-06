import { useQuery } from "react-query";
import axios from "axios";

export interface DrinkSearchParams {
  search: string;
}
export interface Drink {
  name: string;
  imgsrc: string;
}

export async function listDrinks({ search }: DrinkSearchParams) {
  // try {
  const data = await axios.get(
    "https://api.smartinies.recipes/random_list?startAt=0&numResults=50"
  );
  // const res = await fetch(url, {headers:{header, "Content-Type":"application/json"}, body:JSON.stringify({body}), method:"http-methods"})
  // const data = await res.json()
  // }
  // catch(error){

  // }
  // finally{
  //     //Wird immer ausgeführt, sowas wie setloading = false
  // }

  await new Promise((resolve) => setTimeout(resolve, 500));

  const drinks: Drink[] = [];
  for (const item of data.data) {
    const drink: Drink = {
      name: item.cocktailName,
      imgsrc: item.image,
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
