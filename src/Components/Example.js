import React, { useState, useCallback } from "react";
import Container from "./Container";
import CustomDragLayer from "./CustomDragLayer";
export const Example = ({img}) => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(true);


  return (
    <div style={{height: "100%", maxHeight: "100%"}}>
      <Container snapToGrid={snapToGridAfterDrop} img={img} />
      <CustomDragLayer snapToGrid={snapToGridWhileDragging} img={img} />
    </div>
  );
};
