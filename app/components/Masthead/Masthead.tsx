import { styled } from "@/styles/theme";
import { ICreatedUser } from "@/utils/types";

function getAvatar(
  photoUrl: string | null,
  firstName: string,
  lastName: string
) {
  return photoUrl !== null ? (
    <StyledAvatar css={{ backgroundImage: `url(${photoUrl})` }} />
  ) : (
    <StyledInitials>
      {firstName.substring(0, 1)}
      {lastName.substring(0, 1)}
    </StyledInitials>
  );
}

function Masthead({ user }: { user: ICreatedUser }) {
  const avatar = getAvatar(user?.photoUrl, user.firstName, user.lastName);
  return (
    <StyledMasthead>
      <div className="content">
        <span className="greeting">
          Welcome back, <br />
          <strong>
            {user.firstName} {user.lastName}
          </strong>
        </span>
        {avatar}
      </div>
    </StyledMasthead>
  );
}

const StyledMasthead = styled("header", {
  gridColumnStart: 1,
  gridColumnEnd: 3,
  gridRow: "masthead",
  display: "flex",
  alignItems: "center",
  justifyContent: "flex-end",
  px: "$5",
  borderBottom: "1px solid $grey300",
  backgroundColor: "$altBackground",

  "@bp3": {
    px: "$5",
  },

  ".content": {
    display: "flex",
    alignItems: "center",
  },

  ".greeting": {
    color: "$white",
    fontSize: "$2",
    mr: "$5",
    lineHeight: "$4",
    display: "none",

    "@bp3": {
      display: "block",
    },
  },
});

const StyledInitials = styled("div", {
  width: "36px",
  height: "36px",
  borderRadius: "$full",
  backgroundColor: "$white",
  color: "$altBackground",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$3",
  position: "relative",
  zIndex: 1,

  "@bp2": {
    width: "40px",
    height: "40px",
    fontSize: "$4",
  },

  "&:hover": {
    cursor: "pointer",

    "&:after": {
      width: "calc(100% - 1px)",
      height: "calc(100% - 1px)",
      borderColor: "$secondaryColor",
    },
  },

  "&:after": {
    content: "",
    position: "absolute",
    left: "50%",
    top: "50%",
    transform: "translate(-50%, -50%)",
    width: "calc(100% + 8px)",
    height: "calc(100% + 8px)",
    borderRadius: "100%",
    background: "transparent",
    border: "3px solid white",
    zIndex: -1,
    transition: "all 125ms ease",
    pointerEvents: "none",
  },
});

const StyledAvatar = styled("div", {
  width: "40px",
  height: "$40px",
  borderRadius: "$full",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export default Masthead;
