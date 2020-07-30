import { Path, Gradient } from "spritejs";
import ColorsGradient from "@/components/gis/utils/Gradient";
import texture from "@/components/gis/utils/texture.js";
import path from "@/components/gis/utils/path";
import pos from "@/components/gis/utils/pos";

class drawPath {
  constructor() {
    this.Gradient = null;
    this.texture = null;
    this.path = null;
    this.pos = null;
    this.group = null;
    this.p1 = null;
    this.p2 = null;
  }
  init({ name, color, group }) {
    this.Gradient = ColorsGradient[color];
    this.texture = texture[color];
    this.path = path[name];
    this.pos = pos[name];
    this.group = group;
    this.draw();
    this.append(this.p1, this.p2);
  }
  draw() {
    const d = this.path;
    const pos = this.pos;
    const texture = this.texture;
    const Gradients = this.Gradient;
    this.p1 = new Path();
    this.p2 = new Path();
    this.p1.attr({
      d: d,
      fillColor: "rgba(6,13,25,1)",

      pos: pos,
      texture: texture,
      textureRect: [0, 0],
      filter: "drop-shadow(0, 1, 15, rgba(255,255,255,0.6))",
      zIndex: 1,
    });
    this.p2.attr({
      d: d,
      pos: pos,
      strokeColor: "#FFFFFF",
      fillColor: Gradients,
      lineWidth: 3,
      zIndex: 1,
    });
  }
  append(...args) {
    args.forEach((item) => {
      this.group.append(item);
    });
  }
}

export default new drawPath();
