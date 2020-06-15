export function snapToGrid(x, y) {
  // lower multiple = finer grain grid to snap to
  const multiple = 8;
  const snappedX = Math.round(x / multiple) * multiple;
  const snappedY = Math.round(y / multiple) * multiple;
  return [snappedX, snappedY];
}
