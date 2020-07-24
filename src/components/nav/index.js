import { Scene, Sprite, Ring } from "spritejs";
import TabControl from "./modules/tabControl";
class NavAnimate {
  constructor(TabControl) {
    this.ctx = null;
    this.tabControl = TabControl;
  }
  init({ target, shape }) {
    // const container = document.getElementById(targetId);
    this.target = target;
    this.tabControl.init({ target, shape });
    // const scene = new Scene({
    //   container,
    //   width: 1920,
    //   height: 121,
    //   mode: "stickyWidth",
    // });
    // const layer = scene.layer();
    // this.ctx = layer;
    // this.ctx.append(this.drawRing());
    return this;
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
  draw() {}
  animation() {}
  clickLightUp() {
    this.tabControl.clickLightUp();
  }
  hoverLightUp() {
    this.tabControl.hoverLightUp();
  }
}

export default new NavAnimate(TabControl);
