export function createGraph(_width: number, _height: number) {
  let graphWidth = _width;
  let graphHeight = _height;
  let magnification = 1;
  let offsetX = 0;
  let offsetY = 0;

  function setOffset(offset: { x?: number; y?: number }) {
    if (offset.x !== undefined) offsetX = offset.x;
    if (offset.y !== undefined) offsetY = offset.y;
  }

  function setMagnification(mag: number) {
    magnification = mag;
  }

  function refreshSize(width: number, height: number) {
    graphWidth = width;
    graphHeight = height;
  }

  function getCenter() {
    return {
      x: graphWidth / 2 + offsetX,
      y: graphHeight / 2 + offsetY,
    };
  }

  function getRelativePoint(x: number, y: number) {
    const center = getCenter();
    return {
      x: (x - center.x) * magnification,
      y: (y - center.y) * magnification,
    };
  }

  function getSize() {
    return {
      graphWidth,
      graphHeight,
    };
  }

  return {
    getSize,
    getCenter,
    getRelativePoint,
    refreshSize,
    setMagnification,
    setOffset,
  };
}
