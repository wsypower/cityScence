import Grid from "./grid/grid";
import { Scene, Arc, Gradient } from "spritejs";
const NEON_PALETE = ["#6599ff", "#00ccff"];
// const NEON_PALETE = [
//   "#cb3301",
//   "#ff0066",
//   "#ff6666",
//   "#feff99",
//   "#ffff67",
//   "#ccff66",
//   "#99fe00",
//   "#fe99ff",
//   "#ff99cb",
//   "#fe349a",
//   "#cc99fe",
//   "#6599ff",
//   "#00ccff",
//   "#ffffff",
// ];

const T_SWITCH = 150;

const HEX_CRAD = 7;
const HEX_GAP = 3;

const DEF_OPTIONS = {
  HEX_CRAD,
  HEX_GAP,
  HEX_BG: "#061428",
  HEX_HL: "#2a2a2a",
  HEX_HLW: 2,
  off_x: 1.5 * HEX_CRAD + HEX_GAP * Math.sqrt(3) * 0.5,
  unit_x: 3 * HEX_CRAD + HEX_GAP * Math.sqrt(3),
  unit_y: HEX_CRAD * Math.sqrt(3) * 0.5 + 0.5 * HEX_GAP,
};

/**
 * @description
 * 转换为RGB
 */
let wp = NEON_PALETE.map((c) => {
  let num = parseInt(c.replace("#", ""), 16);
  return {
    r: (num >> 16) & 0xff,
    g: (num >> 8) & 0xff,
    b: num & 0xff,
  };
});

let nwp = wp.length;
let csi = 0;
let f = 1 / T_SWITCH;
let t = 0;

class TabControl {
  constructor() {
    // 发光特效上下文
    this.ctx = null;
    this.ctxBackground = null;
    // 发光特效宽度
    this.w = null;
    // 发光特效高度
    this.h = null;
    this.source = null;
    this._min = null;
    // 用于清除动画
    this.request_id = null;
    // 六边形行
    this.rows = null;
    // 六边形列
    this.cols = null;
  }
  init({ target, shape }) {
    this.initBackDom(shape);
    const scene = new Scene({
      container: target,
      width: 876,
      height: 110,
    });
    this.layer = scene.layer();
    // this.clickAnimations();

    // fan.remove();
  }
  initBackDom(shape) {
    this.ctxBackground = shape.getContext("2d");
    this.w = ~~shape.width;
    this.h = ~~shape.height;
    this._min = 0.75 * Math.min(this.w, this.h);
    this.rows = ~~(this.h / DEF_OPTIONS["unit_y"]) + 2;
    this.cols = ~~(this.w / DEF_OPTIONS["unit_x"]) + 2;
    let grid = new Grid(this.rows, this.cols, DEF_OPTIONS);
    grid.draw(this.ctxBackground);
  }
  async clickAnimations({ x, y }) {
    console.log({ x, y });
    const fan = new Arc({
      x: x,
      y: y,
      radius: 50,
      startAngle: 0,
      endAngle: 360,
      opacity: 0,
      fillColor: new Gradient({
        vector: [50, 50, 5, 50, 50, 50],
        colors: [
          { offset: 0, color: "rgba(0,204,255,0.6)" },
          { offset: 0.3, color: "rgba(0,204,255,0.4)" },
          { offset: 0.5, color: "rgba(0,204,255,0.2)" },
          { offset: 0.7, color: "rgba(0,204,255,0.1)" },
          { offset: 1, color: "rgba(0,204,255,0)" },
        ],
      }),
    });
    this.layer.append(fan);
    await fan.transition(0.4).attr({
      x: x,
      y: y,
      scale: [1, 1],
      opacity: 1,
    });
    await fan.transition(0.4).attr({
      x: x,
      y: y,
      scale: [1, 1],
      opacity: 0,
    });
    fan.remove();
  }
  neon() {}
  fillBackground(bg_fill) {
    this.ctx.fillStyle = bg_fill;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.w, this.h);
    this.ctx.closePath();
    this.ctx.fill();
  }
  clickLightUp() {
    this.neon();
  }
}
export default new TabControl();
