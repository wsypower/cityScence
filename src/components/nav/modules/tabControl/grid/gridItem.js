class GridItem {
  constructor(x, y, options = { HEX_CRAD: 32, HEX_HLW: 2 }) {
    this.x = x || 0;
    this.y = y || 0;
    this.points = {
      hex: [],
      hl: [],
    };
    this.HEX_CRAD = options["HEX_CRAD"];
    this.HEX_HLW = options["HEX_HLW"];
    this.init();
  }
  init() {
    let x;
    let y;
    let a;
    let ba = Math.PI / 3;
    let ri = this.HEX_CRAD - 0.5 * this.HEX_HLW;

    for (var i = 0; i < 6; i++) {
      a = i * ba;
      x = this.x + this.HEX_CRAD * Math.cos(a);
      y = this.y + this.HEX_CRAD * Math.sin(a);

      this.points.hex.push({
        x: x,
        y: y,
      });

      if (i > 2) {
        x = this.x + 0 * Math.cos(a);
        y = this.y + 0 * Math.sin(a);

        this.points.hl.push({
          x: x,
          y: y,
        });
      }
    }
  }
  draw(ct) {
    for (var i = 0; i < 6; i++) {
      ct[(i === 0 ? "move" : "line") + "To"](
        this.points.hex[i].x,
        this.points.hex[i].y
      );
    }
  }
  highlight(ct) {
    for (let i = 0; i < 3; i++) {
      ct[(i === 0 ? "move" : "line") + "To"](
        this.points.hl[i].x,
        this.points.hl[i].y
      );
    }
  }
}

export default GridItem;
