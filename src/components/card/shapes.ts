import * as THREE from "three";

const U = 0.01;
export const X = (x: number) => (x - 200) * U;
export const Y = (y: number) => (300 - y) * U;

export type Point = [number, number];

export function polyShape(points: Point[]) {
  const shape = new THREE.Shape();
  points.forEach(([x, y], index) => {
    if (index === 0) shape.moveTo(X(x), Y(y));
    else shape.lineTo(X(x), Y(y));
  });
  shape.closePath();
  return shape;
}

export const FRAME_POINTS: Point[] = [
  [20, 50], [44, 26], [148, 26], [160, 14], [330, 14],
  [330, 470], [20, 470], [20, 330], [10, 320], [10, 215], [20, 205],
];

export const PANEL_POINTS: Point[] = [
  [296, 12], [368, 12], [392, 34], [392, 562],
  [368, 590], [318, 590], [296, 566],
];

export const BOTTOM_POINTS: Point[] = [
  [6, 462], [60, 462], [72, 450], [190, 450], [202, 462],
  [250, 462], [282, 494], [282, 560], [262, 580], [20, 580], [6, 566],
];

export const CHIP_POS = { x: 311, y: 502, width: 66, height: 48 } as const;

export function frameWithWindow() {
  const shape = polyShape(FRAME_POINTS);
  shape.holes.push(circlePath(62, 36, 3.2), circlePath(76, 36, 3.2));
  const hole = new THREE.Path();
  hole.moveTo(X(46), Y(452));
  hole.lineTo(X(46), Y(90));
  hole.quadraticCurveTo(X(46), Y(46), X(90), Y(46));
  hole.lineTo(X(318), Y(46));
  hole.lineTo(X(318), Y(452));
  hole.closePath();
  shape.holes.push(hole);
  return shape;
}

export function bottomWithHoles() {
  const shape = polyShape(BOTTOM_POINTS);
  shape.holes.push(circlePath(34, 567, 3.2), circlePath(48, 567, 3.2));
  return shape;
}

export function circlePath(x: number, y: number, radius: number) {
  const path = new THREE.Path();
  path.absarc(X(x), Y(y), radius * U, 0, Math.PI * 2, true);
  return path;
}
