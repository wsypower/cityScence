<template>
  <div class="float__card">
    <div
      class="cover atvImg"
      :style="cards.style"
      @mousemove="processMovement($event)"
      @mouseenter="processEnter"
      @mouseleave="processExit"
      ref="atvImg"
    >
      <div
        class="atvImg-container"
        ref='atvContainer'
        :style="atvContainerStyle"
      >
        <div class="atvImg-shadow"></div>
        <div
          class="atvImg-layers"
          ref="atvImgLayers"
        >
          <div
            class="atvImg-rendered-layer"
            :style="{'background-image': `url(${this.background})`}"
            ref='render1'
          >
          </div>
          <div
            class="atvImg-rendered-layer"
            :style="{'background-image': `url(${this.floatBack})`}"
            ref='render2'
          >
          </div>
        </div>
        <div
          class="atvImg-shine"
          ref='atvImgShine'
          :style='shine'
        ></div>
      </div>
    </div>
  </div>
</template>

<script>
const bd = document.getElementsByTagName("body")[0];
const htm = document.getElementsByTagName("html")[0];
let bdst = bd.scrollTop || htm.scrollTop;
let bdsl = bd.scrollLeft;

export default {
  name: "float-card-warp",
  props: {
    width: {
      type: Number,
      default: 400
    },
    height: {
      type: Number,
      default: 240
    },
    radius: {
      type: Number,
      default: 8
    },
    background: {
      type: String,
      default: "http://robindelaporte.fr/codepen/visa-bg.jpg"
    },
    floatBack: {
      type: String,
      default: "http://robindelaporte.fr/codepen/visa.png"
    }
  },
  data() {
    return {
      cards: {
        bootom: "http://robindelaporte.fr/codepen/visa-bg.jpg",
        top: "http://robindelaporte.fr/codepen/visa.png",
        style: null
      },
      shine: {},
      atvContainerStyle: {}
    };
  },
  mounted() {
    console.log(this.render);
    this.cards.style = {
      transform: ` perspective(${this.cardWidth * 3}px)`,
      width: `${this.width}px`,
      height: `${this.height}px`,
      borderRadius: `${this.radius}px`
    };
  },
  computed: {
    card() {
      return this.$refs.atvImg;
    },
    cardWidth() {
      return (
        this.card.clientWidth || this.card.offsetWidth || this.card.scrollWidth
      );
    },
    cardHeight() {
      return (
        this.card.clientHeight ||
        this.card.offsetHeight ||
        this.card.scrollHeight
      );
    },
    atvImgLayers() {
      return this.$refs.atvImgLayers;
    },
    atvImgShine() {
      return this.$refs.atvImgShine;
    },
    atvContainer() {
      return this.$refs.atvContainer;
    },
    render1() {
      return this.$refs.render1;
    },
    render2() {
      return this.$refs.render2;
    }
  },

  methods: {
    processMovement(e, touchEnabled) {
      let totalLayers = Array.isArray(this.atvImgLayers)
        ? this.atvImgLayers.length
        : 1;

      let w = this.cardWidth;
      let h = this.cardHeight;

      let offsets = this.card.getBoundingClientRect();

      let pageX = touchEnabled ? e.touches[0].pageX : e.pageX;
      let pageY = touchEnabled ? e.touches[0].pageY : e.pageY;
      let wMultiple = 400 / w;
      let offsetX = 0.52 - (pageX - offsets.left - bdsl) / w;
      let offsetY = 0.52 - (pageY - offsets.top - bdst) / h;
      let dy = pageY - offsets.top - bdst - h / 2;
      let dx = pageX - offsets.left - bdsl - w / 2;
      let yRotate = (offsetX - dx) * (0.07 * wMultiple);
      let xRotate = (dy - offsetY) * (0.1 * wMultiple);

      let imgCSS = "rotateX(" + xRotate + "deg) rotateY(" + yRotate + "deg)";
      let arad = Math.atan2(dy, dx);
      let angle = (arad * 180) / Math.PI - 90;

      if (angle < 0) {
        angle = angle + 360;
      }
      if (this.atvContainer.className.indexOf(" over") != -1) {
        imgCSS += " scale3d(1.07,1.07,1.07)";
      }

      this.atvContainerStyle = {
        transform: imgCSS
      };

      this.shine = {
        background:
          "linear-gradient(" +
          angle +
          "deg, rgba(255,255,255," +
          ((pageY - offsets.top - bdst) / h) * 0.4 +
          ") 0%,rgba(255,255,255,0) 80%)",
        transform:
          "translateX(" +
          offsetX * 2 -
          0.1 +
          "px) translateY(" +
          offsetY * 2 -
          0.1 +
          "px)"
      };
      var revNum = 2;
      let layers = [this.render1, this.render2];
      for (var ly = 0; ly < 2; ly++) {
        layers[ly].style.transform =
          "translateX(" +
          offsetX * revNum * ((ly * 2.5) / wMultiple) +
          "px) translateY(" +
          offsetY * totalLayers * ((ly * 2.5) / wMultiple) +
          "px)";
        revNum--;
      }
    },

    processEnter(e) {
      this.atvContainer.className += " over";
    },

    processExit() {
      this.atvContainer.className = this.atvContainer.className.replace(
        " over",
        ""
      );
      this.atvContainerStyle.transform = "";
      this.shine = null;
      let layers = [this.render1, this.render2];
      for (var ly = 0; ly < 2; ly++) {
        layers[ly].style.transform = "";
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.float__card {
  cursor: pointer;
  .cover {
    height: 240px;
    width: 400px;
    margin: 15px;
    border-radius: 8px;
    translate: all 0.4s;
  }
  .atvImg {
    border-radius: 8px;
    transform-style: preserve-3d;
    -webkit-tap-highlight-color: rgba(#000, 0);
  }

  .atvImg img {
    border-radius: 8px;
    box-shadow: 0 2px 8px rgba(14, 21, 47, 0.25);
  }

  .atvImg-container {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    transition: all 0.2s ease-out;
  }

  .atvImg-container.over .atvImg-shadow {
    box-shadow: 0 45px 100px rgba(14, 21, 47, 0.4),
      0 16px 40px rgba(14, 21, 47, 0.4);
  }

  .atvImg-layers {
    position: relative;
    width: 100%;
    height: 100%;
    border-radius: 8px;
    overflow: hidden;
    transform-style: preserve-3d;
  }

  .atvImg-rendered-layer {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0%;
    left: 0%;
    background-repeat: no-repeat;
    background-position: center;
    background-color: transparent;
    background-size: cover;
    transition: all 0.1s ease-out;
    overflow: hidden;
    border-radius: 8px;
  }

  .atvImg-shadow {
    position: absolute;
    top: 5%;
    left: 5%;
    width: 90%;
    height: 90%;
    transition: all 0.2s ease-out;
    box-shadow: 0 8px 30px rgba(14, 21, 47, 0.6);
  }

  .atvImg-shine {
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    border-radius: 8px;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0.25) 0%,
      rgba(255, 255, 255, 0) 60%
    );
  }
}
</style>