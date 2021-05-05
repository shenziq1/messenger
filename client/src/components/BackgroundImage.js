import React from "react";
import bgImg from "../assets/images/bg-img.png"
import {
  Typography,
  Card,
  CardContent,
} from "@material-ui/core";
import { makeStyles} from "@material-ui/core/styles";

const useStyles = makeStyles(theme => ({
  root: {
    position: "relative",
    backgroundImage:`linear-gradient(to bottom, rgba(58, 141, 255, 0.85), rgba(134, 185, 255, 0.85)), url(${bgImg})`,
    width:"400px",
    height:"700px",
  },
  font: {
    position: "absolute",
    top: "50%",
    width: "100%",
    textAlign: "center",
    color: "white",
    backgroundColor: "none",
    fontFamily: "Open Sans",
    fontStyle: "semibold",
    fontSize: 32,
  },
}));

const BackgroundImage = () => {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="header" component="p" className={classes.font}>
         Converse with anyone with any language
        </Typography>
      </CardContent>
    </Card>
  )
}
export default BackgroundImage;
