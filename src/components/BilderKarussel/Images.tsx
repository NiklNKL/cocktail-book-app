import {
  Box,
  CircularProgress,
  Stack,
  IconButton,
  Typography,
  Checkbox,
} from "@mui/material";
import ImageBox from "./ImageBox";
import "./hover.css";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDrinks } from "./ImageServer";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import axios from "axios";

interface Cocktail {
  cocktailName: string;
  id: number;
  image: string;
  instructions: string;
}

export default function Images({ search }: { search: string }) {
  const [currentMouseX, setCurrentMouseX] = useState(0);
  const [startClickX, setStartClickX] = useState<number | null>(null);
  const [currentScrollX, setCurrentScrollX] = useState(0);
  const imageWrapperRef = useRef<HTMLElement[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);
  const [checked, setChecked] = useState(false);
  const [resetScroll, setResetScroll] = useState(false);
  const [cocktails, setCocktails] = useState<Cocktail[]>([]);
  const imagesLoaded = 50;

  useEffect(() => {
    if (resetScroll) {
      scrollContainerRef.current.scrollTo({ left: 0, behavior: "smooth" });
      setResetScroll(false);
    }
  }, [resetScroll]);

  const onScroll = () => {
    const screenWidth = document.body.clientWidth;
    for (const [index, image] of imageWrapperRef.current.entries()) {
      const position = image.getBoundingClientRect().left;
      const percentage =
        Math.max(Math.min(position, screenWidth), 0) / screenWidth;
      const element = imageWrapperRef.current[index];
      if (!element) continue;
      element.style.objectPosition = `${percentage * 100}% 0`;
    }
  };

  useEffect(() => {
    if (!scrollContainerRef.current) return;

    scrollContainerRef.current.addEventListener("scroll", onScroll);
    return () => {
      scrollContainerRef.current.removeEventListener("scroll", onScroll);
    };
  }, []);

  useEffect(() => {
    const update = (e: MouseEvent) => {
      setCurrentMouseX(e.clientX);
      onScroll();
    };
    const mouseDown = (e: MouseEvent) => {
      setStartClickX(e.clientX);
      setCurrentScrollX(scrollContainerRef.current.scrollLeft);
    };
    const mouseUp = () => {
      setStartClickX(null);
    };

    window.addEventListener("mousedown", mouseDown);
    window.addEventListener("mousemove", update);
    window.addEventListener("mouseup", mouseUp);
    return () => {
      window.removeEventListener("mousemove", update);
      window.removeEventListener("mousedown", mouseDown);
      window.removeEventListener("mouseup", mouseUp);
    };
  }, []);
  const scrollAmount = useMemo(() => {
    if (startClickX == null) return 0;
    return currentMouseX - startClickX;
  }, [startClickX, currentMouseX]);

  const scrollContainerRef = useRef<HTMLElement>(null!);
  useEffect(() => {
    if (!scrollAmount) return;
    scrollContainerRef.current.scrollLeft = currentScrollX - scrollAmount * 2.5;
  }, [currentScrollX, scrollAmount]);

  const forwardPage = () => {
    setCurrentImg(currentImg + imagesLoaded), setPageNumber(pageNumber + 1);
    setResetScroll(true);
  };
  const BackwardPage = () => {
    setCurrentImg(currentImg - imagesLoaded), setPageNumber(pageNumber - 1);
    setResetScroll(true);
  };
  const handleChange = () => {
    setChecked(!checked);
  };

  const headers = {
    "Content-Type": "application/json",
    Authorization: "Bearer " + sessionStorage.getItem("access_token"),
  };

  useEffect(() => {
    if (
      sessionStorage.getItem("access_token") != undefined &&
      sessionStorage.getItem("access_token") != null
    ) {
      axios
        .get("https://api.smartinies.recipes/favourites", {
          headers: headers,
        })
        .then((response) => {
          setCocktails(response.data);
        })
        .catch((error) => {
          console.error(error);
          setCocktails([]);
        });
    }
  }, [checked]);

  function checkIfIdExists(idString: string): boolean {
    const id = parseInt(idString);
    return cocktails.some((cocktail) => cocktail.id === id);
  }
  const { data: drinks = [], isLoading } = useDrinks({
    search: search,
    checked: checked,
  });
  if (isLoading)
    return (
      <Box
        height="99vh"
        width="99vw"
        justifyContent="center"
        display={"flex"}
        alignItems="center"
      >
        <CircularProgress />
      </Box>
    );
  return (
    <Box height="auto" marginTop="7%" paddingTop="3%">
      <Box className="fadeout" height="56vh">
        <Stack
          direction="row"
          spacing={4}
          overflow="auto"
          height={"56vh"}
          className="scroll"
          ref={(ref: any) => {
            scrollContainerRef.current = ref;
          }}
        >
          <Box
            marginRight="1%"
            marginLeft="9%"
            alignItems="center"
            justifyContent="center"
            justifyItems="center"
            display="flex"
          >
            <Typography variant="h1" align="right" alignSelf="center">
              Grab your drink:
            </Typography>
          </Box>
          {drinks
            .slice(currentImg, currentImg + imagesLoaded)
            .map((drink, index) => {
              if (cocktails.length > 0) {
                const exists = checkIfIdExists(drink.id);
                return (
                  <ImageBox
                    source={drink.imgsrc}
                    alt={drink.name}
                    key={drink.name}
                    id={drink.id}
                    isFav={exists}
                    ref={(ref: HTMLImageElement) => {
                      imageWrapperRef.current[index] = ref;
                    }}
                  />
                );
              } else {
                return (
                  <ImageBox
                    source={drink.imgsrc}
                    alt={drink.name}
                    key={drink.name}
                    id={drink.id}
                    isFav={false}
                    ref={(ref: HTMLImageElement) => {
                      imageWrapperRef.current[index] = ref;
                    }}
                  />
                );
              }
            })}
        </Stack>
      </Box>
      <Box display="flex" justifyContent={"center"}>
        <Box marginRight="1%" display="flex">
          <IconButton onClick={BackwardPage} disabled={pageNumber == 1}>
            <ArrowCircleLeftIcon />
          </IconButton>
        </Box>
        <Box display="flex" justifyContent={"end"}>
          <p className="prevent-select">
            Page: {pageNumber}/{Math.ceil(drinks.length / imagesLoaded)}
          </p>
        </Box>
        <Box display="flex" justifyContent={"end"} marginLeft="1%">
          <IconButton
            onClick={forwardPage}
            disabled={pageNumber == Math.ceil(drinks.length / imagesLoaded)}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent={"center"} alignItems="flex-end">
        <p>Available Drinks: {drinks.length}</p>
      </Box>
      <Box display="flex" justifyContent={"center"} alignItems="center">
        <Typography>Only use available ingredients: </Typography>
        <Checkbox checked={checked} onClick={handleChange}></Checkbox>
      </Box>
    </Box>
  );
}
