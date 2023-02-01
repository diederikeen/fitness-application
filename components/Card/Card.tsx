import { styled } from "../../styles/theme";
import { PropsWithChildren } from "react";
import { CSS } from "@stitches/react";

export function Card({ children, css = {} }: PropsWithChildren<{ css?: CSS }>) {
  return <StyledCard css={{ ...css }}>{children}</StyledCard>;
}

const StyledCard = styled("div", {
  backgroundColor: "$white",
  borderRadius: "$5",
  p: "$3",
  boxShadow: "$0",

  "@bp3": {
    p: "$5",
  },
});
