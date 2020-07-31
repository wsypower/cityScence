import { Path, Label } from "spritejs";
import ColorsGradient from "@/components/gis/utils/Gradient";
import texture from "@/components/gis/utils/texture.js";
import path from "@/components/gis/utils/path";
import pos from "@/components/gis/utils/pos";

const city = {
  wenzhou: "温州",
  lishui: "丽水",
  tanzhou: "衢州",
  jinhua: "金华",
  taizhou: "台州",
  ningbo: "宁波",
  shaoxing: "绍兴",
  hangzhou: "杭州",
  huzhou: "湖州",
  jiaxing: "嘉兴",
  zhoushan: "舟山",
};
class drawPath {
  constructor() {
    this.null;
    this.Gradient = null;
    this.texture = null;
    this.path = null;
    this.pos = null;
    this.group = null;
    this.p1 = null;
    this.p2 = null;
    this.text1 = null;
    this.text2 = null;
  }
  init({ name, color, group }) {
    this.name = city[name];
    this.Gradient = ColorsGradient[color];
    this.texture = texture[color];
    this.path = path[name];
    this.pos = pos[name];
    this.group = group;
    this.draw();
    this.text();
    this.append(this.p1, this.p2, this.text1, this.text2);
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
      filter: "drop-shadow(-1, 1, 15, rgba(255,255,255,0.7))",
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
    if (this.name === "舟山") {
      console.log(this.p1);
      this.p1.attr({
        normalize: false,
        texture: "",
        // textureRect: [0, 100],
      });
    }
  }
  text() {
    const name = this.name;
    let pos = this.pos;
    switch (name) {
      case "温州":
        pos = [pos[0] + 130, pos[1] + 120];
        break;
      case "丽水":
        pos = [pos[0] + 130, pos[1] + 120];
        break;
      case "衢州":
        pos = [pos[0] + 100, pos[1] + 70];
        break;
      case "金华":
        pos = [pos[0] + 100, pos[1] + 90];
        break;
      case "台州":
        pos = [pos[0] + 110, pos[1] + 60];
        break;
      case "宁波":
        pos = [pos[0] + 70, pos[1] + 50];
        break;
      case "绍兴":
        pos = [pos[0] + 70, pos[1] + 60];
        break;
      case "杭州":
        pos = [pos[0] + 180, pos[1] + 100];
        break;
      case "湖州":
        pos = [pos[0] + 80, pos[1] + 40];
        break;
      case "嘉兴":
        pos = [pos[0] + 70, pos[1] + 40];
        break;
      case "舟山":
        pos = [pos[0] + 70, pos[1] + 80];
        break;
      default:
        break;
    }
    this.text1 = new Label(name);
    this.text2 = new Label(name);
    this.text1.attr({
      pos: pos,
      fillColor: "#0A2246",
      font: "600  24px 'PingFang-SC-Heavy'",
      zIndex: 4,
      filter: "drop-shadow(1, 1, 0, rgba(255,255,255,1))",
    });
    this.text2.attr({
      pos: pos,
      fillColor: "#fff",
      strokeWidth: 3,
      strokeColor: "#fff",
      font: "600  24px 'PingFang-SC-Heavy'",
      zIndex: 3,
      filter: "drop-shadow(-1, -1, 0, rgba(255,255,255,1))",
    });
  }
  append(...args) {
    args.forEach((item) => {
      this.group.append(item);
    });
  }
}

export default new drawPath();
