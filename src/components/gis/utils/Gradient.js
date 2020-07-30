import { Gradient } from "spritejs";
const ColorsGradient = {
  red: new Gradient({
    vector: [160, 120, 80, 160, 120, 330],

    colors: [
      { offset: 0, color: "rgba(204,25,38,0.2)" },
      { offset: 1, color: "rgba(204,25,38,0.9)" },
    ],
  }),
  gray: new Gradient({
    vector: [160, 120, 80, 160, 120, 330],

    colors: [
      { offset: 0, color: "rgba(137,141,152,0.2)" },
      { offset: 1, color: "rgba(137,141,152,0.9)" },
    ],
  }),
  green: new Gradient({
    vector: [160, 120, 80, 160, 120, 330],

    colors: [
      { offset: 0, color: "rgba(0,188,73,0.2)" },
      { offset: 1, color: "rgba(0,188,73,0.9)" },
    ],
  }),
  orange: new Gradient({
    vector: [160, 120, 80, 160, 120, 330],
    colors: [
      { offset: 0, color: "rgba(218,101,18,0.2)" },
      { offset: 1, color: "rgba(230,104,6,0.9)" },
    ],
  }),
  yellow: new Gradient({
    vector: [160, 120, 80, 160, 120, 330],

    colors: [
      { offset: 0, color: "rgba(226,224,57,0.2)" },
      { offset: 1, color: "rgba(226,224,57,0.9)" },
    ],
  }),
};
export default ColorsGradient;
