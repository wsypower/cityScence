import { Scene, Group, Path, Gradient } from "spritejs";
import drawPath from "./drawPath";
class Draw {
  constructor({ w, h, are }) {
    this.w = w;
    this.h = h;
    this.are = are;
    this.areArr = null;
    this.scene = null;
    this.Group = null;
    this.drawPath = drawPath;
  }
  init() {
    this.initScene()
      .initGroup()
      .initGroupPath();
  }
  initScene() {
    this.scene = new Scene({
      container: this.gis,
      width: this.w,
      height: this.h,
    });
    this.layer = this.scene.layer();
    this.group = new Group();
    return this;
  }
  initGroup() {
    this.Group.attr({
      width: this.w,
      height: this.h,
      pos: [0, 0],
    });
    this.layer.append(this.group);
    return this;
  }
  initGroupPath() {
    const group = this.group;
    this.area.forEach((are) => {
      this.drawPath.init({ ...are, group });
      this.areArr.push();
    });
  }
}

export default Draw;
