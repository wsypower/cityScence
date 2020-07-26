import { Scene, Rect, Ring, Sprite, Gradient, Path, Parallel } from "spritejs";
import TabControl from "./modules/tabControl";
const point = [
  [168, 150],
  [306, 150],
  [438, 150],
  [573, 150],
  [708, 150],
];
const iconPoint = [
  [168, 40],
  [302, 40],
  [438, 40],
  [571, 40],
  [706, 40],
];
class NavAnimate {
  constructor(TabControl) {
    this.ctx = null;
    this.slider = null;
    this.tabControl = TabControl;
    this.sliderScene = null;
    this.icons = [];
    this.parallelLeftArray = [];
    this.parallelRightArray = [];
  }
  init({ target, shape, slider, footer }) {
    this.target = target;
    this.slider = slider;
    this.ctx = footer;
    this.tabControl.init({ target, shape });
    this.sliderInit(slider);
    this.initCanvas(footer);
    return this;
  }
  // 初始化下方画布
  initCanvas(footer) {
    const scene = new Scene({
      container: footer,
      width: 1920,
      height: 121,
    });
    this.ctx = scene.layer();
    this.drawCenterBorder();
    this.drawLiftRightRetouch();
  }
  // 绘制中间层的边框，用作发光效果
  drawCenterBorder() {
    const path = new Path();
    path.attr({
      d:
        "M132.454,6.546 L848.672,6.546 C875.641,6.546 884.672,22.546 884.672,22.546 L975.782,138.000 L6.437,138.000 L96.307,22.663 C96.307,22.663 105.368,6.546 132.454,6.546 Z",
      pos: [470, -5],
      scale: 1,
      strokeColor: "#fff",
      lineWidth: 2,
      filter: " drop-shadow(0px 0px 20px #2cc3f4)",
    });
    path.animate([{ opacity: 0 }, { opacity: 1 }, { opacity: 0 }], {
      endDelay: 1000,
      duration: 3200,
      iterations: Infinity,
      easing: "ease-in-out",
    });
    this.ctx.appendChild(path);
  }
  // 绘制左右两侧的装饰
  drawLiftRightRetouch() {
    const temlParallel = ((x, angle) => {
      let xPoint = 400;
      return (x, angle, y = 107) => {
        xPoint = xPoint + x;
        return new Parallel({
          normalize: true,
          x: xPoint,
          y: y,
          sides: [4, 10],
          fillColor: "#00A9FD",
          angle: angle,
        });
      };
    })();
    const temlParallelRight = ((x, angle) => {
      let xPoint = 1441;
      return (x, angle, y = 107) => {
        xPoint = xPoint + x;
        return new Parallel({
          normalize: true,
          x: xPoint,
          y: y,
          sides: [4, 10],
          fillColor: "#00A9FD",
          angle: angle,
        });
      };
    })();
    for (let i = 0; i < 9; i++) {
      let rectRight = temlParallel(8, -53);
      let rectLeft = temlParallelRight(8, 53);
      this.parallelLeftArray.push(rectRight);
      this.parallelRightArray.push(rectLeft);
    }
    this.parallelLeftArray.forEach((item, index) => {
      let time = index * 100;
      item.animate(
        [
          { fillColor: "rgba(0,169,253,0.3)" },
          { fillColor: "#01F6FF" },
          { fillColor: "rgba(0,169,253,0.3)" },
        ],
        {
          delay: time,
          endDelay: 1000,
          duration: 3000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
      this.ctx.appendChild(item);
    });
    this.parallelRightArray.reverse().forEach((item, index) => {
      let time = index * 100;
      item.animate(
        [
          { fillColor: "rgba(0,169,253,0.3)" },
          { fillColor: "#01F6FF" },
          { fillColor: "rgba(0,169,253,0.3)" },
        ],
        {
          delay: time,
          endDelay: 1000,
          duration: 3000,
          iterations: Infinity,
          easing: "ease-in-out",
        }
      );
      this.ctx.appendChild(item);
    });
  }
  sliderInit(slider) {
    const sliderScene = new Scene({
      container: slider,
      width: 876,
      height: 110,
    });
    this.sliderScene = sliderScene.layer();
    this.drawSliderRect();
    this.iconRetouchInit(2);
  }
  drawSliderRect() {
    this.rect = new Rect({
      normalize: true,
      pos: point[2],
      size: [70, 90],
      fillColor: "#2cc3f4",
      lineCap: "square",
      filter: " drop-shadow(0px 1px 7px #2cc3f4)",
    });
    this.sliderScene.append(this.rect);
  }
  // 下方横条的动画
  drawSliderRectAnimation(index) {
    this.rect.animate([{ x: point[index][0] }], {
      duration: 500,
      easing: "ease-out",
      fill: "both",
    });
    this.rect.animate(
      [
        { fillColor: "#2cc3f4" },
        { fillColor: "#fff" },
        { fillColor: "#2cc3f4" },
      ],
      {
        duration: 1200,
        fill: "both",
      }
    );
  }
  iconRetouchInit(index) {
    const icon = new Sprite({
      anchor: [0.5, 0.5],
      size: [50, 50],
      pos: iconPoint[index],
      bgcolor: new Gradient({
        vector: [25, 0, 25, 50],
        colors: [
          { offset: 0, color: "rgba(0,204,255,0.5)" },
          { offset: 0.2, color: "rgba(0,204,255,0.4)" },
          { offset: 0.4, color: "rgba(0,204,255,0.3)" },
          { offset: 0.6, color: "rgba(0,204,255,0.1)" },
          { offset: 1, color: "rgba(0,204,255,0)" },
        ],
      }),
      opacity: 0,
      filter: " drop-shadow(0px 5px 10px #060D19)",
      borderWidth: 2,
      scale: 1.2,
      borderColor: new Gradient({
        vector: [25, 0, 25, 50],
        colors: [
          { offset: 0, color: "rgba(0,250,255,1.0)" },
          { offset: 0.2, color: "rgba(0,204,255,0.8)" },
          { offset: 0.4, color: "rgba(0,204,255,0.3)" },
          { offset: 0.6, color: "rgba(0,204,255,0.2)" },
          { offset: 1, color: "rgba(0,204,255,0)" },
        ],
      }),
      borderRadius: 7,
    });
    icon.transition(0.4).attr({
      scale: [1.0, 1.0],
      opacity: 1,
    });
    this.icons.length && this.icons.pop().remove();
    this.icons.push(icon);
    this.sliderScene.append(icon);
  }
  drawRing() {
    const ring = new Ring({
      pos: [100, 50],
      innerRadius: 20,
      outerRadius: 30,
      fillColor: "blue",
    });
    return ring;
  }
  clickLightUp(x, index) {
    this.tabControl.clickAnimations({ x: x, y: 57 });
    this.drawSliderRectAnimation(index);
    this.iconRetouchInit(index);
  }
}

export default new NavAnimate(TabControl);
