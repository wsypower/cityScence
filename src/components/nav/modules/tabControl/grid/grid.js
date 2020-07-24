import GridItem from "./gridItem";

class Grid {
  constructor(rows, cols, options) {
    this.cols = cols || 16;
    this.rows = rows || 16;
    this.items = [];
    this.n = this.items.length;
    this.options = options;
    this.init();
  }
  init() {
    let x, y;
    for (let row = 0; row < this.rows; row++) {
      y = row * this.options["unit_y"];

      for (let col = 0; col < this.cols; col++) {
        x =
          (row % 2 == 0 ? 0 : this.options["off_x"]) + col * this.options["unit_x"];
        this.items.push(new GridItem(x, y, this.options));
      }
    }
    this.n = this.items.length;
  }
  draw(ct) {
    ct.fillStyle = this.options["HEX_BG"];
    ct.beginPath();

    for (var i = 0; i < this.n; i++) {
      this.items[i].draw(ct);
    }

    ct.closePath();
    ct.fill();

    ct.strokeStyle = this.options["HEX_CRAD"];
    ct.beginPath();

    for (var i = 0; i < this.n; i++) {
      this.items[i].highlight(ct);
    }

    ct.closePath();
    ct.stroke();
  }
}

export default Grid;
