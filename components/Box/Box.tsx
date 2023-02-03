import { styled } from "../../styles/theme";

import { CSS } from "@stitches/react";
import { PropsWithChildren } from "react";

const StyledBox = styled("div", {});

interface Props {
  as?: "div" | "span";
  css: CSS;
  className?: string;
}

export function Box({
  children,
  as = "div",
  css,
  ...props
}: PropsWithChildren<Props>) {
  return (
    <StyledBox css={{ ...css }} {...props} as={as}>
      {children}
    </StyledBox>
  );
}
