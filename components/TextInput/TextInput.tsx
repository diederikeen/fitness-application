import { styled } from "../../styles/theme";
import { InputHTMLAttributes, ReactNode } from "react";
import { FormikFormProps, FormikProps } from "formik";

const InputWrapper = styled("div", {
  ".inner-wrapper": {
    display: "flex",
    flexDirection: "column",
    position: "relative",
  },
});

const StyledInput = styled("input", {
  height: "34px",
  px: "$3",
  border: "1px solid $grey300",
  borderRadius: "$1",
  variants: {
    hasError: {
      true: {
        borderColor: "$error",
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
  fontSize: "$3",
  fontWeight: "bold",
  textTransform: "uppercase",
});

interface Props {
  label?: ReactNode;
  field: InputHTMLAttributes<HTMLInputElement>;
  form: FormikProps<FormikFormProps>;
  type: string;
  error?: string;
  touched?: boolean;
}

export function TextInput({ field, form, label, type, error, touched }: Props) {
  const hasLabel = label !== undefined;
  const hasError =
    error !== undefined &&
    ((touched === true && field.value !== "") || form.isSubmitting);

  return (
    <InputWrapper>
      <div className={"inner-wrapper"}>
        {hasLabel && (
          <StyledLabel css={{ marginBottom: "$2" }}>{label}</StyledLabel>
        )}
        <StyledInput {...field} type={type} hasError={hasError} />
        {hasError && <StyledError>{error}</StyledError>}
      </div>
    </InputWrapper>
  );
}
