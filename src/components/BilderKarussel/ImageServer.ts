import { useQuery } from "react-query";

export interface DrinkSearchParams {
  search: string;
}
export interface Drink {
  name: string;
  imgsrc: string;
}

export async function listDrinks({ search }: DrinkSearchParams) {
  // try {

  // const res = await fetch(url, {headers:{header, "Content-Type":"application/json"}, body:JSON.stringify({body}), method:"http-methods"})
  // const data = await res.json()
  // }
  // catch(error){

  // }
  // finally{
  //     //Wird immer ausgeführt, sowas wie setloading = false
  // }
  await new Promise((resolve) => setTimeout(resolve, 500));
  const drinks: Drink[] = [
    {
      name: "Mojito",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
    },
    {
      name: "Old Fashioned",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/vrwquq1478252802.jpg",
    },
    {
      name: "Long Island Tea",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/nkwr4c1606770558.jpg",
    },
    {
      name: "Negroni",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/qgdu971561574065.jpg",
    },
    {
      name: "Whiskey Sour",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/hbkfsh1589574990.jpg",
    },
    {
      name: "Dry Martini",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/6ck9yi1589574317.jpg",
    },
    {
      name: "Daiquiri",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/mrz9091589574515.jpg",
    },
    {
      name: "Margarita",
      imgsrc:
        "https://www.thecocktaildb.com/images/media/drink/5noda61589575158.jpg",
    },
  ];
  const filteredDrinks = drinks.filter((drink) =>
    drink.name.toLowerCase().includes(search.toLowerCase())
  );
  return filteredDrinks;
}

export const useDrinks = (params: DrinkSearchParams) =>
  useQuery(["drinks", params], () => listDrinks(params));
