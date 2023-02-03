import { CSS } from "@stitches/react";
import { PropsWithChildren } from "react";
import { styled } from "../../styles/theme";

interface Props {
  as?: "p" | "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "strong" | "italic";
  css?: CSS;
}

export function Typography({ as, css, children }: PropsWithChildren<Props>) {
  return (
    <StyledComponent css={{ ...css }} as={as}>
      {children}
    </StyledComponent>
  );
}

const StyledComponent = styled("span", {});
