import { Grid, makeStyles } from "@material-ui/core";
import { Photo } from "@material-ui/icons";
import { Box } from "@mui/material";
import { Key, ReactElement, JSXElementConstructor, ReactFragment } from "react";

const useStyles = makeStyles({
  gridContainer: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  gridItem: {
    padding: "20px",

    textAlign: "center",
  },
  image: {
    witdth: "100px",
    height: "100px",
  },
});

interface Props {
  data: [];
}

const DynamicGrid: React.FC<Props> = ({ data }) => {
  const classes = useStyles();
  return (
    <Grid container className={classes.gridContainer} spacing={2}>
      {data.map(
        (item: {
          id: Key | null | undefined;
          img: Key | null | undefined;
          image: any;
          ingredientName:
            | string
            | number
            | boolean
            | ReactElement<any, string | JSXElementConstructor<any>>
            | ReactFragment
            | null
            | undefined;
        }) => (
          <Grid item xs sm md lg className={classes.gridItem} key={item.id}>
            <Box>
              <img
                className={classes.image}
                src={item.image}
                alt={item.ingredientName?.toString()}
              />
            </Box>
          </Grid>
        )
      )}
    </Grid>
  );
};

export default DynamicGrid;
