import React from "react";
const styles = {
  padding: "0 0",
  cursor: "move",
};
export const Box = ({ img, yellow }) => {
  const backgroundColor = yellow ? "yellow" : "white";
  return <img src={img} style={{ ...styles, backgroundColor }}/>;
};
