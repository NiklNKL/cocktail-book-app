import { useState } from "react";
import { useSpring, useTrail } from "react-spring";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    height: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    overflow: "hidden",
  },
  image: {
    width: "100%",
    height: "auto",
    position: "absolute",
    willChange: "transform",
    backgroundSize: "cover",
  },
}));

const images = [
  "https://www.thecocktaildb.com/images/media/drink/metwgh1606770327.jpg",
  "https://www.thecocktaildb.com/images/media/drink/1q7coh1504736292.jpg",
  "https://www.thecocktaildb.com/images/media/drink/3pylqc1504370988.jpg",
];

const ParallaxEffect = () => {
  const classes = useStyles();
  const [index, setIndex] = useState(0);

  const props = useSpring({
    transform: `translate3d(0, ${-index * 100}%, 0)`,
  });

  const trail = useTrail(images.length, {
    from: { opacity: 0 },
    to: { opacity: 1 },
  });

  return (
    <div className={classes.container}>
      <div
        style={{ height: "300%", width: "100%", position: "absolute", top: 0 }}
      >
        <div
          style={{
            position: "absolute",
            width: "100%",
            height: "100%",
            overflow: "hidden",
          }}
        >
          {images.map((image, i) => (
            <div
              key={i}
              className={classes.image}
              style={{ backgroundImage: `url(${image})`, top: `${i * 100}%` }}
            />
          ))}
        </div>
      </div>
      <div
        onMouseMove={(e) => setIndex(e.clientY / window.innerHeight)}
        style={{
          position: "absolute",
          width: "100%",
          height: "100%",
          zIndex: 2,
        }}
      >
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          {trail.map((props, i) => (
            <div key={i} style={{ ...props, padding: "20px" }}>
              <img
                src={images[i]}
                alt={`Image ${i + 1}`}
                width="100"
                height="100"
              />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ParallaxEffect;
