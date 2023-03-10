import { CSS } from "@stitches/react";
import { PropsWithChildren } from "react";

import { styled } from "@/styles/theme";

const StyledBox = styled("div", {});

interface Props {
  as?: "div" | "span" | "nav";
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
