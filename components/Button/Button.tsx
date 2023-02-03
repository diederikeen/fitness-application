import { CSS } from "@stitches/react";
import { ButtonHTMLAttributes, ReactNode } from "react";

import { styled } from "../../styles/theme";

const StyledButton = styled("button", {
  fontFamily: "inherit",
  border: "none",
  background: "$primaryColor",
  color: "$white",
  px: "$5",
  py: "$4",
  borderRadius: "$2",
  letterSpacing: "0.5px",
  fontSize: "$3",
  fontWeight: "600",

  variants: {
    disabled: {
      true: {
        backgroundColor: "$grey300",
        cursor: "not-allowed",
      },
    },
    ghost: {
      true: {
        background: "transparent",
        color: "$textDefault",
        px: "$3",
        py: "$2",
      },
    },
    danger: {
      true: {
        color: "$error",
      },
    },
  },
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  css?: CSS;
  ghost?: boolean;
  danger?: boolean;
}

export function Button({ children, css, ...props }: Props) {
  return (
    <StyledButton css={{ ...css }} {...props}>
      {children}
    </StyledButton>
  );
}
