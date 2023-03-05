import { Box, CircularProgress, Stack } from "@mui/material";
import ImageBox from "./ImageBox";
import "./hover.css";
import { useEffect, useState, useMemo, useRef } from "react";
import { useDrinks } from "./ImageServer";

export default function Images() {
  const [currentMouseX, setCurrentMouseX] = useState(0);
  const [startClickX, setStartClickX] = useState<number | null>(null);
  const [currentScrollX, setCurrentScrollX] = useState(0);

  useEffect(() => {
    const update = (e: MouseEvent) => {
      setCurrentMouseX(e.clientX);
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
    <Stack
      direction="row"
      spacing={2}
      overflow="auto"
      height={"70vh"}
      className="scroll"
      ref={(ref: any) => {
        scrollContainerRef.current = ref;
      }}
    >
      {drinks.map((drink) => (
        <ImageBox source={drink.imgsrc} alt={drink.name} key={drink.name} />
      ))}
    </Stack>
  );
}
