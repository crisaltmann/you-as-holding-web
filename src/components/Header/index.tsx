import { makeStyles, Typography } from "@material-ui/core";

const useStyles = makeStyles(() => ({
  header: {
    height: "100px",
    width: "100vw",
    display: "flex",
    alignItems: "center",
    paddingLeft: "30px",
    backgroundColor: "#015da4",
  },
  title: {
    fontFamily: "Exo",
    color: "#1C1D1E",
    // textTransform: "uppercase",
  },
}));

const Header = () => {
  const classes = useStyles();
  return (
    <div className={classes.header}>
      <Typography className={classes.title} variant='h3'>
        You As Holding
      </Typography>
    </div>
  );
};

export default Header;
