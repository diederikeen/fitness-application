import { UilArrowRight } from "@iconscout/react-unicons";

import { styled } from "@/styles/theme";
import { TExercise } from "@/utils/types";

interface Props {
  exercise: TExercise;
}

export function ExerciseRow({ exercise }: Props) {
  return (
    <StyledRow>
      {exercise.name}

      <div style={{ marginLeft: "auto" }}>
        <UilArrowRight color="currentColor" className="icon-arrow" />
      </div>
    </StyledRow>
  );
}

const StyledRow = styled("div", {
  display: "flex",
  alignItems: "center",
  p: "$3",
  transition: "color 175ms ease",

  ".icon-arrow": {
    transition: "transform 175ms ease",
  },

  "@bp3": {
    p: "$4",
  },

  "&:not(:last-child)": {
    borderBottom: "1px solid $grey100",
  },

  "&:hover": {
    color: "$secondaryColor",

    ".icon-arrow": {
      transform: "translateX(6px)",
    },
  },
});
