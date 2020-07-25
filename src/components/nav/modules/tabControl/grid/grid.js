import GridItem from "./gridItem";
import { Scene, Arc, Gradient } from "spritejs";

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
          (row % 2 == 0 ? 0 : this.options["off_x"]) +
          col * this.options["unit_x"];
        this.items.push(new GridItem(x, y, this.options));
      }
    }
    this.n = this.items.length;
  }
  draw(ct) {
    ct.save();
    ct.beginPath();
    ct.moveTo(35, 109);
    ct.lineTo(8, 88);
    ct.arc(10, 80, 7.5, 134, 35, false);
    ct.lineTo(44, 24);
    ct.quadraticCurveTo(64, -6, 105, 1);
    ct.lineTo(797, 1);
    ct.quadraticCurveTo(816, 4, 835, 34);
    ct.lineTo(873, 84);
    ct.arc(867, 88, 7, 35, 190, false);
    ct.lineTo(870, 94);
    ct.lineTo(837, 109);
    ct.closePath();
    ct.restore();
    ct.clip();

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

    const LinearGradient = ct.createLinearGradient(431, 0, 431, 30);
    LinearGradient.addColorStop(0, "rgba(33,192,251,0.6)");
    LinearGradient.addColorStop(0.1, "rgba(33,192,251,0.5)");
    LinearGradient.addColorStop(0.2, "rgba(33,192,251,0.3)");
    LinearGradient.addColorStop(0.5, "rgba(33,192,251,0.1)");
    LinearGradient.addColorStop(1, "rgba(33,192,251,0)");
    ct.fillStyle = LinearGradient;
    ct.fillRect(30, 1, 800, 50);

    const LinearGradientBootom = ct.createLinearGradient(431, 93, 431, 120);
    LinearGradientBootom.addColorStop(0, "rgba(33,192,251,0)");
    LinearGradientBootom.addColorStop(1, "rgba(33,192,251,0.4)");
    ct.fillStyle = LinearGradientBootom;
    ct.fillRect(0, 85, 900, 60);

    // ct.fillStyle = "red";
    // ct.fillRect(0, 85, 110, 110);
  }
}

export default Grid;
