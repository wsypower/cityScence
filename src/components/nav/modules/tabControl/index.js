import Grid from "./grid/grid";

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
    // 获取canvas 上下文
    this.ctx = target.getContext("2d");
    this.ctxBackground = shape.getContext("2d");

    this.w = ~~target.width;
    this.h = ~~target.height;
    this._min = 0.75 * Math.min(this.w, this.h);

    this.rows = ~~(this.h / DEF_OPTIONS["unit_y"]) + 2;
    this.cols = ~~(this.w / DEF_OPTIONS["unit_x"]) + 2;

    // let grid = new Grid(this.rows, this.cols, DEF_OPTIONS);
    // grid.draw(this.ctxBackground);

    if (!this.source) {
      this.source = {
        x: ~~(this.w / 2),
        y: ~~(this.h / 2),
      };
    }
    this.fillBackground("#071C32");

    // this.neon();
  }
  neon() {
    let k = (t % T_SWITCH) * f;
    let rgb = {
      r: ~~(wp[csi].r * (1 - k) + wp[(csi + 1) % nwp].r * k),
      g: ~~(wp[csi].g * (1 - k) + wp[(csi + 1) % nwp].g * k),
      b: ~~(wp[csi].b * (1 - k) + wp[(csi + 1) % nwp].b * k),
    };
    let rgb_str = "rgb(" + rgb.r + "," + rgb.g + "," + rgb.b + ")";

    let light = this.ctx.createRadialGradient(
      this.source.x,
      this.source.y,
      0,
      this.source.x,
      this.source.y,
      0.875 * this._min
    );
    let stp =
      0.5 -
      0.5 * Math.sin(7 * t * f) * Math.cos(5 * t * f) * Math.sin(3 * t * f);

    light.addColorStop(0, rgb_str);
    light.addColorStop(stp, "rgba(0,0,0,.03)");

    this.fillBackground("#071C32");
    this.fillBackground(light);

    t++;

    if (t % T_SWITCH === 0) {
      csi++;

      if (csi === nwp) {
        csi = 0;
        t = 0;
      }
    }
    this.request_id = requestAnimationFrame(() => {
      this.neon();
    });
  }
  brightness() {
    
  }
  fillBackground(bg_fill) {
    this.ctx.fillStyle = bg_fill;
    this.ctx.beginPath();
    this.ctx.rect(0, 0, this.w, this.h);
    this.ctx.closePath();
    this.ctx.fill();
  }
  clickLightUp() {
    this.brightness();
  }
  hoverLightUp() {
    this.neon();
  }
}
export default new TabControl();
