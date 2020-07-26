import { Scene, Rect, Ring, Sprite, Gradient } from "spritejs";
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
    this.slider = null;
    this.tabControl = TabControl;
    this.sliderScene = null;
    this.icons = [];
  }
  init({ target, shape, slider }) {
    this.target = target;
    this.slider = slider;
    this.tabControl.init({ target, shape });
    this.sliderInit(slider);
    return this;
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
  // hoverLightUp() {
  //   this.tabControl.hoverLightUp();
  // }
}

export default new NavAnimate(TabControl);
