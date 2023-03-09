import {
  Box,
  CircularProgress,
  Stack,
  Button,
  IconButton,
  Typography,
} from "@mui/material";
import ImageBox from "./ImageBox";
import "./hover.css";
import { useEffect, useState, useMemo, useRef } from "react";
import RefreshIcon from "@mui/icons-material/Refresh";
import { useDrinks } from "./ImageServer";
import ArrowCircleRightIcon from "@mui/icons-material/ArrowCircleRight";
import ArrowCircleLeftIcon from "@mui/icons-material/ArrowCircleLeft";
import { Search } from "@mui/icons-material";

export default function Images({ search }: { search: string }) {
  const [currentMouseX, setCurrentMouseX] = useState(0);
  const [startClickX, setStartClickX] = useState<number | null>(null);
  const [currentScrollX, setCurrentScrollX] = useState(0);
  const imageWrapperRef = useRef<HTMLElement[]>([]);
  const [pageNumber, setPageNumber] = useState(1);
  const [currentImg, setCurrentImg] = useState(0);

  const [resetScroll, setResetScroll] = useState(false);

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
    console.log("Images" + search);
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
    setCurrentImg(currentImg + 50), setPageNumber(pageNumber + 1);
    setResetScroll(true);
  };
  const BackwardPage = () => {
    setCurrentImg(currentImg - 50), setPageNumber(pageNumber - 1);
    setResetScroll(true);
  };
  const { data: drinks = [], isLoading } = useDrinks({ search: search });
  if (isLoading)
    return (
      <Box
        height="100%"
        width="100%"
        display="flex"
        justifyContent="center"
        alignItems="center"
      >
        <CircularProgress />;
      </Box>
    );
  return (
    <Box height="100%" marginTop="3%">
      <Box className="fadeout" height="56vh">
        <Stack
          direction="row"
          spacing={4}
          overflow="auto"
          height={"56vh"}
          className="scroll"
          top="20%"
          ref={(ref: any) => {
            scrollContainerRef.current = ref;
          }}
        >
          <Box
            marginRight="1%"
            marginLeft="9%"
            alignItems="center"
            justifyContent="center"
          >
            {" "}
            <Typography variant="h1" align="right">
              Grab your drink:
            </Typography>
          </Box>
          {drinks.slice(currentImg, currentImg + 20).map((drink, index) => (
            <ImageBox
              source={drink.imgsrc}
              alt={drink.name}
              key={drink.name}
              id={drink.id}
              ref={(ref: HTMLImageElement) => {
                imageWrapperRef.current[index] = ref;
              }}
            />
          ))}
        </Stack>
      </Box>
      <Box display="flex" justifyContent={"center"}>
        <Box marginTop="120px" marginRight="20px" display="flex">
          <IconButton onClick={BackwardPage} disabled={pageNumber == 1}>
            <ArrowCircleLeftIcon />
          </IconButton>
        </Box>
        <Box marginTop="120px" display="flex" justifyContent={"end"}>
          <p className="prevent-select">
            Page: {pageNumber}/{Math.ceil(drinks.length / 50)}
          </p>
        </Box>
        <Box
          marginTop="120px"
          display="flex"
          justifyContent={"end"}
          marginLeft="20px"
        >
          <IconButton
            onClick={forwardPage}
            disabled={pageNumber == Math.ceil(drinks.length / 50)}
          >
            <ArrowCircleRightIcon />
          </IconButton>
        </Box>
      </Box>
      <Box display="flex" justifyContent={"center"} alignItems="flex-end">
        <p>Available Drinks: {drinks.length}</p>
      </Box>
    </Box>
  );
}
