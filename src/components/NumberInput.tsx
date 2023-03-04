import React from "react";
import { Input, InputProps } from "@mui/material";

export interface NumberInputProps {
  value?: string | number;
  onChange?: (value: number) => void;
  decimal?: boolean;
  allowNegative?: boolean;
  // default 2
  maxDecimals?: number;
  // set when exiting empty input -> default 0
  blurValue?: number;
}

export default function NumberInput(props: NumberInputProps & InputProps) {
  const { onChange, value, decimal, allowNegative, ...other } = props;

  // value of the input -> stores invalid states between correct numbers
  const [inputValue, setInputValue] = React.useState(
    value === undefined ? "" : switchDecimalSeparator(value.toString())
  );

  // update input state when props.value changes
  React.useEffect(() => {
    setInputValue(
      value === undefined ? "" : switchDecimalSeparator(value.toString())
    );
  }, [value]);

  const error = React.useMemo(() => {
    if (inputValue === "") return false;
    const englishValue = switchDecimalSeparator(inputValue);
    if (isNaN(decimal ? parseFloat(englishValue) : parseInt(englishValue)))
      return true;
    if (!allowNegative && englishValue.startsWith("-")) return true;
    return false;
  }, [inputValue, decimal, allowNegative]);

  return (
    <Input
      {...other}
      error={error || other.error}
      value={inputValue}
      onChange={(e) => {
        e.preventDefault();
        const newValue = e.target.value;
        // prevent more than one decimal separator
        if (newValue.split(",").length + newValue.split(".").length > 3) return;
        if (newValue.split("-").length > 2) return;
        const cleanedValue = newValue
          // replace "." with "," to convert all values to german format
          .replace(/\./g, ",")
          // remove all non-numeric characters except "," and "-"
          .replace(/[^0-9,-]/g, "");
        // check if not to many decimal places -> too many can cause floating point errors
        const decimalPlaces = cleanedValue.split(",")[1]?.length ?? 0;
        if (decimalPlaces > (props.maxDecimals ?? 2)) return;
        // update input value
        setInputValue(cleanedValue);
        // return 0 if empty
        if (cleanedValue === "") return onChange?.(0);
        // switch "," back to "." to convert string to number
        const englishValue = switchDecimalSeparator(cleanedValue);
        const parsed = decimal
          ? parseFloat(englishValue)
          : parseInt(englishValue);
        // if no correct number -> don't call onChange
        if (isNaN(parsed)) return;
        // if negative numbers are not allowed -> don't call onChange
        if (!allowNegative && parsed < 0) return;
        // call onChange with parsed number
        onChange?.(parsed);
      }}
      onBlur={() => {
        if (inputValue === "") {
          onChange?.(props.blurValue ?? 0);
          setInputValue(
            switchDecimalSeparator((props.blurValue ?? 0).toString())
          );
        }
      }}
    />
  );
}

function switchDecimalSeparator(value: string) {
  const parts = value.split(",");
  return parts.map((part) => part.split(".").join(",")).join(".");
}
