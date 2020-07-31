<template>
  <div
    class="gis"
    ref="gis"
  >

  </div>
</template>

<script>
import { Scene, Group, Path, Gradient } from "spritejs";
import drawPath from "./drawPath.js";
import Draw from "./draw";
import drawOut from "./draw-outline.js";
export default {
  name: "vGis",
  computed: {
    gis() {
      return this.$refs.gis;
    },
    w() {
      return this.$refs.gis.offsetWidth;
    },
    h() {
      return this.$refs.gis.offsetHeight;
    }
  },
  data() {
    return {
      scene: null,
      layer: null,
      group: null,
      area: [
        { name: "wenzhou", color: "red" },
        { name: "wenzhou", color: "red" },
        { name: "lishui", color: "orange" },
        { name: "tanzhou", color: "yellow" },
        { name: "jinhua", color: "red" },
        { name: "taizhou", color: "gray" },
        { name: "shaoxing", color: "yellow" },
        { name: "hangzhou", color: "green" },
        { name: "ningbo", color: "green" },
        { name: "jiaxing", color: "orange" },
        { name: "huzhou", color: "yellow" },
        { name: "zhoushan", color: "yellow" }
      ]
    };
  },
  mounted() {
    this.initLayer();
  },
  methods: {
    initLayer() {
      this.scene = new Scene({
        container: this.gis,
        width: this.w,
        height: this.h
      });
      this.layer = this.scene.layer();
      this.group = new Group();
      this.initGroup();
    },
    initGroup() {
      this.group.attr({
        width: this.w,
        height: this.h,
        pos: [0, 0]
      });
      this.layer.append(this.group);
      drawOut.init({ Group: this.group });
      this.initGroupItem();
    },
    initGroupItem() {
      const group = this.group;
      this.area.forEach(are => {
        drawPath.init({ ...are, group });
      });
    }
  }
};
</script>

<style lang="scss" scoped>
.gis {
  width: 100%;
  height: 100%;
}
</style>