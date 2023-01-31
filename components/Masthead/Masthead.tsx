import { styled } from "../../styles/theme";
import { ICreatedUser } from "../../utils/types";

function getAvatar(photoUrl: string | null, firstName: string) {
  return photoUrl !== null ? (
    <StyledAvatar css={{ backgroundImage: `url(${photoUrl})` }} />
  ) : (
    <StyledInitials>{firstName.substring(0, 2)}</StyledInitials>
  );
}

function Masthead({ user }: { user: ICreatedUser }) {
  const avatar = getAvatar(user?.photoUrl, user.firstName);
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
  px: "$3",
  borderBottom: "1px solid $grey300",

  "@bp3": {
    px: "$5",
  },

  ".content": {
    display: "flex",
    alignItems: "center",
  },

  ".greeting": {
    fontSize: "$2",
    mr: "$3",
  },
});

const StyledInitials = styled("div", {
  width: "40px",
  height: "40px",
  borderRadius: "$full",
  backgroundColor: "$grey300",
  color: "$white",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "$4",
});

const StyledAvatar = styled("div", {
  width: "40px",
  height: "$40px",
  borderRadius: "$full",
  backgroundSize: "cover",
  backgroundPosition: "center",
});

export default Masthead;
