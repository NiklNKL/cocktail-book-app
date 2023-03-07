import { Box, CircularProgress, Stack } from "@mui/material";
import ImageBox from "./ImageBox";
import "./hover.css";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDrinks } from "./ImageServer";

export default function Images() {
  const [currentMouseX, setCurrentMouseX] = useState(0);
  const [startClickX, setStartClickX] = useState<number | null>(null);
  const [currentScrollX, setCurrentScrollX] = useState(0);
  const imageWrapperRef = useRef<HTMLElement[]>([]);

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

  const { data: drinks = [], isLoading } = useDrinks({ search: "" });
  if (isLoading) return <CircularProgress />;
  return (
    <Box className="fadeout" height="100%">
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
        {drinks.map((drink, index) => (
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
  );
}
