<!--
 * @Description: 
 * @Author: huacong
 * @Date: 2020-08-03 15:44:25
 * @LastEditTime: 2020-08-03 22:55:38
 * @LastEditors: huacong
-->
<template>
  <div class="proton">
    <canvas
      id="canvas"
      width="961"
      height="856"
      ref='canvasProton'
    ></canvas>
  </div>
</template>

<script>
import Proton from "proton-engine";

export default {
  name: "vProton",
  data() {
    return {
      gl: null,
      proton: null,
      renderer: null,
      stats: null,
      canvas: null
    };
  },
  computed: {
    canvasProton() {
      return this.$refs.canvasProton;
    }
  },
  mounted() {
    this.Main();
  },
  methods: {
    Main() {
      this.canvas = this.canvasProton;
      this.createProton();
      this.tick();
    },
    createProton() {
      this.proton = new Proton();
      this.createColorEmitter();

      this.renderer = new Proton.WebGLRenderer(this.canvas);
      this.proton.addRenderer(this.renderer);
    },
    createColorEmitter() {
      const emitter = new Proton.Emitter();
      emitter.rate = new Proton.Rate(
        new Proton.Span(16, 19),
        new Proton.Span(0.1, 0.2)
      );

      emitter.addInitialize(new Proton.Mass(1));
      emitter.addInitialize(new Proton.Radius(1, 7));
      emitter.addInitialize(new Proton.Life(1, 3));
      emitter.addInitialize(
        new Proton.V(new Proton.Span(0, 5), new Proton.Span(0, 360), "polar")
      );
      emitter.addBehaviour(new Proton.Alpha(1, 0.2));
      emitter.addBehaviour(new Proton.Scale(1, 0));
      emitter.addBehaviour(new Proton.Color("#ffffff"));
      emitter.addBehaviour(new Proton.RandomDrift(40, 40, 0.05));
      emitter.addBehaviour(
        new Proton.CrossZone(
          new Proton.CircleZone(903 / 2, 910 / 2, 1450),
          "dead"
        )
      );
      emitter.p.x = 903 / 2;
      emitter.p.y = 910 / 2;

      emitter.emit();
      this.proton.addEmitter(emitter);
    },
    tick() {
      requestAnimationFrame(this.tick);
      this.proton.update();
    }
  }
};
</script>

<style lang="scss" scoped>
.proton {
  width: 100%;
  height: 100%;
  #canvas {
    // background-color: rgba(0, 0, 0, 0.6);
  }
}
</style>