import { FormLabel, Input, InputProps, Typography } from "@mui/material";
import { useField } from "formik";
import React, { FC } from "react";

type InputFieldProps = InputProps & {
  name: string;
  label: string;
  placehodler: string;
};

const InputField: FC<InputFieldProps> = ({ label, ...props }) => {
  const [field, { error }] = useField(props.name);
  return (
    // <FormControl isInvalid={!!error}>
    <>
      <FormLabel htmlFor={field.name}>{label}</FormLabel>
      <Input
        {...field}
        {...props}
        id={field.name}
        placeholder={props.placehodler}
      />
      {error ? <Typography>{error}</Typography> : null}
    </>
    // </FormControl>
  );
};

export default InputField;
