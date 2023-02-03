import { useFormikContext } from "formik";
import { HTMLProps } from "react";

import { renderFormField } from "../../utils/renderFormField/renderFormField";
import { Box } from "../Box/Box";
import { Button } from "../Button/Button";

export interface IField extends HTMLProps<HTMLInputElement> {
  name: string;
  label?: string;
  layout?: "full" | "half" | "quarter";
}

interface Props {
  fields: IField[] | IField[][];
  columnGap?: number;
  rowGap?: number;
  buttonLabel?: string;
  inline?: boolean;
  isSubmitButtonDisabled?: boolean;
}

export function FormComposer({
  fields,
  buttonLabel = "Submit",
  columnGap = 3,
  rowGap = 5,
  inline = false,
  isSubmitButtonDisabled = false,
}: Props) {
  const formContext = useFormikContext();
  const { errors, touched, isSubmitting } = formContext as unknown as Record<
    string,
    any
  >;

  return (
    <form
      onSubmit={formContext.handleSubmit}
      style={inline ? { display: "flex", alignItems: "flex-end" } : {}}
    >
      <Box
        css={{
          containerType: "inline-size",
          display: "grid",
          columnGap: `$${columnGap}`,
          rowGap: `$${rowGap}`,
          width: inline ? "100%" : "auto",

          ".child-container": {
            gridTemplateColumns: "1fr",
          },

          "@container(min-width: 420px)": {
            ".child-container": {
              gridTemplateColumns: "unset",
              gridAutoFlow: "column",
            },
          },
        }}
      >
        {fields.map((field, index) => {
          const isGroup = Array.isArray(field);
          return isGroup ? (
            <Box
              key={index}
              className="child-container"
              css={{
                display: "grid",
                columnGap: `$${columnGap}`,
                rowGap: `$${rowGap}`,
              }}
            >
              {field.map((childField) =>
                renderFormField(
                  childField,
                  errors[childField.name],
                  touched[childField.name]
                )
              )}
            </Box>
          ) : (
            renderFormField(field, errors[field.name], touched[field.name])
          );
        })}
      </Box>
      <Button
        css={{
          mt: "$6",
          ml: inline ? "$4" : 0,
          height: inline ? "34px" : "auto",
          py: inline && 0,
        }}
        type={"submit"}
        disabled={isSubmitButtonDisabled || isSubmitting}
      >
        {buttonLabel}
      </Button>
    </form>
  );
}
