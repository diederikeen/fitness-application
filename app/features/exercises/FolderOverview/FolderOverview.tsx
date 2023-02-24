import Link from "next/link";

import { Box } from "@/components/Box/Box";
import { Card } from "@/components/Card/Card";
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
          <Card
            css={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Typography css={{ fontWeight: "bold" }} className="folder-title">
              {folder.name}
            </Typography>

            <Typography css={{ fontSize: "$2", color: "$grey400", mt: "0" }}>
              Number of exercises: <strong>({folder.exercises.length})</strong>
            </Typography>
          </Card>
        </StyledLink>
      ))}
    </Box>
  );
}

const StyledLink = styled(Link, {
  textDecoration: "none",

  "&:hover .folder-title": {
    color: "$secondaryColor",
  },
});
