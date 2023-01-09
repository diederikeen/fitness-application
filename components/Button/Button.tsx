import { styled } from "../../styles/theme";
import { ButtonHTMLAttributes, ReactNode } from "react";
import { CSS } from "@stitches/react";

const StyledButton = styled("button", {
  fontFamily: "inherit",
  border: "none",
  background: "$primaryColor",
  color: "$white",
  px: "$5",
  py: "$4",
  borderRadius: "$1",
  letterSpacing: "0.5px",
  fontSize: "$3",
  fontWeight: "600",
});

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode;
  css?: CSS;
}

export function Button({ children, css }: Props) {
  return <StyledButton css={{ ...css }}>{children}</StyledButton>;
}
