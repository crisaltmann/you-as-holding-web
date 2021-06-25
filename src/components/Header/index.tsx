import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  header: {
    height: "100px",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    paddingLeft: "30px",
    backgroundColor: "rgba(1, 93, 164, 0.5)",
  },
  title: {
    fontFamily: "Exo",
    color: "#1C1D1E",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography className={classes.title} variant='h3'>
        You As A Holding
      </Typography>
    </div>
  );
};

export default Header;
