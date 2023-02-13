import Link from "next/link";
import { useRouter } from "next/router";

import { Box } from "@/components/Box/Box";
import { Typography } from "@/components/Typography/Typography";
import { styled } from "@/styles/theme";

interface Props {
  currentPage: string;
}

export function Breadcrumbs({ currentPage }: Props) {
  const router = useRouter();
  const crumbs = getCrumbs(router.asPath);
  return (
    <Box css={{ mb: "$4", display: "flex", alignItems: "center" }} as="nav">
      {crumbs.map((el, index) => {
        const base = crumbs[0];

        if (index === 0) {
          return (
            <StyledLink key={el} href={`/${base}`}>
              <Box as="span" css={{ textDecoration: "underline" }}>
                {el}
              </Box>
            </StyledLink>
          );
        }

        return (
          <StyledLink key={`/${base}/${el}`} href={`/${base}/${el}`}>
            <Box as="span" css={{ textDecoration: "underline" }}>
              {el}
            </Box>
          </StyledLink>
        );
      })}
      <Typography
        as="p"
        css={{
          m: 0,
          ml: "$1",
          fontSize: "$2",
          color: "$grey400",
          textDecoration: "none",
        }}
      >
        {currentPage.toLowerCase()}
      </Typography>
    </Box>
  );
}

function getCrumbs(path: string) {
  return path
    .split("/")
    .splice(0, path.split("/").length - 1)
    .filter((string) => string !== "");
}

const StyledLink = styled(Link, {
  fontSize: "$2",
  color: "$grey900",
  textDecoration: "none",

  "&:after": {
    content: " / ",
  },
});
