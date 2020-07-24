<template>
  <div class="nav">
    <div id="nav__warp">
      <div
        class="nav__controller"
        @click="clickLightUp"
      >
        <canvas
          ref='CanvasLight'
          class="canvas"
          width="876"
          height="121"
        ></canvas>
        <canvas
          ref='CanvasShape'
          class="canvas"
          width="876"
          height="121"
        ></canvas>
      </div>

    </div>
  </div>
</template>

<script>
import NavCanvasAnimate from "./index.js";
export default {
  name: "v-gloabl-nav",
  data() {
    return {};
  },
  computed: {
    navScalyCanvasDom() {
      return this.$refs.CanvasLight;
    },
    shape() {
      return this.$refs.CanvasShape;
    }
  },
  mounted() {
    // 初始化canvas对象
    NavCanvasAnimate.init({
      target: this.navScalyCanvasDom,
      shape: this.shape
    });
  },
  methods: {
    clickLightUp() {
      NavCanvasAnimate.clickLightUp();
    },
    hoverLightUp() {
      NavCanvasAnimate.hoverLightUp();
    }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100%;
  background-color: saddlebrown;
  #nav__warp {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    .nav__controller {
      width: 876px;
      height: 121px;
      position: relative;
      .canvas {
        position: absolute;
        left: 0;
      }
    }
  }
}
</style>