import { UilArrowRight } from "@iconscout/react-unicons";
import Link from "next/link";

import { Box } from "@/components/Box/Box";
import { Typography } from "@/components/Typography/Typography";
import { styled } from "@/styles/theme";
import { IFolder } from "@/utils/types";

interface IProps {
  folders: IFolder[];
  isLoading: boolean;
}

export function FolderOverview({ folders, isLoading }: IProps) {
  return (
    <Box
      css={{
        display: "grid",
        gap: "$2",
        gridTemplateColumns: "repeat(1, 1fr)",

        "@container folder-overview (min-width: 600px)": {
          gridTemplateColumns: "repeat(2, 1fr)",
        },

        "@container folder-overview (min-width: 900px)": {
          gridTemplateColumns: "repeat(4, 1fr)",
        },
      }}
    >
      {isLoading && <Typography>Getting your folders.</Typography>}
      {folders?.map((folder) => (
        <StyledLink href={`./exercises/folders/${folder.id}`} key={folder.id}>
          <StyledTile>
            <div className={"row-content"}>
              <Typography
                css={{ fontWeight: "bold", m: 0 }}
                className="folder-title"
              >
                {folder.name}
              </Typography>

              <Typography css={{ fontSize: "$2", color: "$grey400", m: "0" }}>
                Number of exercises:{" "}
                <strong>({folder.exercises.length})</strong>
              </Typography>
            </div>

            <Box css={{ ml: "auto" }} className="icon-arrow">
              <UilArrowRight color="inherit" />
            </Box>
          </StyledTile>
        </StyledLink>
      ))}
    </Box>
  );
}

const StyledTile = styled("div", {
  py: 0,
  display: "flex",
  alignItems: "center",
  backgroundColor: "$primaryBg",
  p: "$4",
  borderRadius: "$3",
  border: "1px solid $grey100",

  "@bp3": {
    flexDirection: "column",
    justifyContent: "center",
    textAlign: "center",
    p: "$6",

    ".icon-arrow": {
      display: "none",
    },
  },
});

const StyledLink = styled(Link, {
  textDecoration: "none",

  "&:hover .folder-title": {
    color: "$secondaryColor",
  },
});
