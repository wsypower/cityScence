import { Scene, Rect, Ring } from "spritejs";
import TabControl from "./modules/tabControl";
const point = [
  [168, 150],
  [306, 150],
  [438, 150],
  [573, 150],
  [708, 150],
];
class NavAnimate {
  constructor(TabControl) {
    this.ctx = null;
    this.slider = null;
    this.tabControl = TabControl;
    this.sliderScene = null;
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
    console.log(this.sliderScene);
    this.drawSliderRect();
  }
  drawSliderRect() {
    this.rect = new Rect({
      normalize: true,
      pos: point[2],
      size: [70, 90],
      fillColor: "#2cc3f4",
      lineCap: "square",
    });
    this.sliderScene.append(this.rect);
  }
  drawSliderRectAnimation(index) {
    this.rect.transition(0.2).attr({
      pos: point[index],
    });
  }
  drawSliderLine() {}
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
  }
  // hoverLightUp() {
  //   this.tabControl.hoverLightUp();
  // }
}

export default new NavAnimate(TabControl);
