import { useSpring, animated } from "react-spring";
import { Box, Paper } from "@mui/material";
import React from "react";

function Podium({ rank, src, color, crownWidth }) {
  const props = useSpring({
    from: { transform: "translate3d(0,0px,0)", opacity: 1 },
    to: async (next) => {
      if (rank === "Gold") {
        while (1) {
          await next({ transform: "translate3d(0,20px,0)" });
          await next({ transform: "translate3d(0,-10px,0)" });
        }
      }
    },
    config: { duration: 300 },
  });

  return (
    <animated.div style={props}>
      <Paper
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundImage: `linear-gradient(45deg, ${color} 30%, #FF8E53 90%)`,
          height: "100%",
          width: "100%",
          textAlign: "center",
          transform: "perspective(500px) rotateY(20deg)",
          boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
          borderRadius: "15px", // Rounded corners
          padding: 2,
          marginBottom: 2,
        }}
      >
        <Box sx={{ width: "100%", height: "50%" }}>
          <img
            src={src}
            alt={`${rank}등`}
            style={{ width: "100%", height: "100%" }}
          />
        </Box>
        <img
          src={`/images/${rank}.png`}
          alt={`${rank}등`}
          style={{ width: crownWidth, height: "50%" }}
        />
      </Paper>
    </animated.div>
  );
}

export default Podium;
