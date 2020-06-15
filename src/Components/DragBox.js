import React, { useState, useCallback } from "react";
import Container from "./Container";
import CustomDragLayer from "./CustomDragLayer";
export const DragBox = ({ img }) => {
  const [snapToGridAfterDrop, setSnapToGridAfterDrop] = useState(true);
  const [snapToGridWhileDragging, setSnapToGridWhileDragging] = useState(true);

  return (
    <div style={{width: "100%", maxWidth: "100%", height: "100%", maxHeight: "100%"}}>
      <Container snapToGrid={snapToGridAfterDrop} img={img} />
      <CustomDragLayer snapToGrid={snapToGridWhileDragging} img={img} />
    </div>
  );
};
