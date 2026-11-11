export type BusinessId = "advisory" | "software" | "proprietary" | "realestate";
export type Entity = BusinessId | "group";

/** Bar geometry [x, y, w, h] within the 100×100 mark. */
export const BAR: Record<Entity, readonly [number, number, number, number]> = {
  group: [20, 62, 60, 18],
  advisory: [20, 41, 60, 18],
  software: [20, 20, 60, 18],
  proprietary: [20, 20, 18, 60],
  realestate: [41, 20, 18, 60],
};
