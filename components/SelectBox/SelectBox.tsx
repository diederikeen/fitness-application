import { FormikFormProps, FormikProps } from "formik";
import { InputHTMLAttributes, ReactNode } from "react";

import { styled } from "@/styles/theme";

interface Props {
  label?: ReactNode;
  field: InputHTMLAttributes<HTMLSelectElement>;
  form: FormikProps<FormikFormProps>;
  type: string;
  error?: string;
  touched?: boolean;
  inline?: boolean;
  options: Array<{ value: string | number; label: string }>;
}

export function SelectBox({
  field,
  form,
  label,
  type,
  error,
  touched,
  inline = false,
  ...rest
}: Props) {
  const hasLabel = label !== undefined;
  const hasError =
    error !== undefined &&
    ((touched === true && field.value !== "") || form.isSubmitting);

  return (
    <InputWrapper>
      <div className={"inner-wrapper"}>
        {hasLabel && (
          <StyledLabel
            css={{ marginBottom: "$2", ml: "$2" }}
            htmlFor={field.id ?? field.name}
          >
            {label}
          </StyledLabel>
        )}
        {hasError && <StyledError>{error}</StyledError>}
        <StyledSelect {...field} {...rest} hasError={hasError} id={field.name}>
          {rest.options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </StyledSelect>
      </div>
    </InputWrapper>
  );
}

const InputWrapper = styled("div", {
  ".inner-wrapper": {
    display: "flex",
    flexDirection: "row",
    position: "relative",
  },
});

const StyledSelect = styled("select", {
  width: "100%",
  height: "34px",
  px: "$3",
  border: "1px solid $grey300",
  borderRadius: "$4",
  variants: {
    hasError: {
      true: {
        borderColor: "$error",
      },
    },
    inline: {
      true: {
        border: "none",
        p: "0",
      },
    },
  },
});

const StyledError = styled("span", {
  color: "$error",
  fontSize: "$3",
  position: "absolute",
  top: "100%",
  marginTop: "$1",
});

const StyledLabel = styled("label", {
  fontSize: "$2",
  fontWeight: "bold",
  color: "$grey800",
});
