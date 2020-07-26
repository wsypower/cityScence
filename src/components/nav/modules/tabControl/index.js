import Grid from "./grid/grid";
import { Scene, Arc, Gradient, Path } from "spritejs";

const NEON_PALETE = ["#6599ff", "#00ccff"];

const HEX_CRAD = 5;
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
    this.breathingAnimationInit();
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
  // 闪动的背景
  breathingAnimationInit() {
    const p1 = new Path();
    p1.attr({
      d:
        "M80.014,-0.000 L744.749,-0.000 C770.070,-0.000 778.549,14.982 778.549,14.982 L820.799,69.291 C820.799,69.291 825.740,75.713 820.799,81.464 C813.326,88.255 797.327,103.000 797.327,103.000 L66.712,103.000 L27.436,103.000 C27.436,103.000 14.191,90.378 3.963,81.464 C-2.735,75.170 3.963,69.291 3.963,69.291 L46.076,15.092 C46.076,15.092 54.583,-0.000 80.014,-0.000 Z",
      scale: [1.04, 1],
      lineWidth: 12,
      pos: [10, 3],
      // fillColor: "red",
      fillColor: new Gradient({
        vector: [419, 58, 200, 419, 58, 440],
        colors: [
          { offset: 0, color: "rgba(0,204,255,0.08)" },
          { offset: 0.5, color: "rgba(101,153,255,0.3)" },
          { offset: 0.8, color: "rgba(101,153,255,0.1)" },
          { offset: 1, color: "rgba(101,153,255,0.0)" },
        ],
      }),
    });
    this.layer.appendChild(p1);
    p1.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], {
      endDelay: 1000,
      duration: 3200,
      iterations: Infinity,
      easing: "ease-in-out",
    });
  }
  async clickAnimations({ x, y }) {
    const fan = new Arc({
      x: x,
      y: y,
      radius: 57,
      startAngle: 0,
      endAngle: 360,
      opacity: 0,
      fillColor: new Gradient({
        vector: [57, 57, 5, 57, 57, 57],
        colors: [
          { offset: 0, color: "rgba(0,204,255,0.8)" },
          { offset: 0.3, color: "rgba(0,204,255,0.6)" },
          { offset: 0.5, color: "rgba(0,204,255,0.2)" },
          { offset: 0.7, color: "rgba(0,204,255,0.1)" },
          { offset: 1, color: "rgba(0,204,255,0)" },
        ],
      }),
      // filter: " drop-shadow(0px 0px 5px rgba(0,204,255,0.4))",
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

  clickLightUp() {
    this.neon();
  }
}
export default new TabControl();
