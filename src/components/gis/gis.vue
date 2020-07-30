<template>
  <div
    class="gis"
    ref="gis"
  >
  </div>
</template>

<script>
import { Scene, Group, Path } from "spritejs";
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
      group: null
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
        pos: [0, 0],
        bgcolor: "#cec"
      });
      this.layer.append(this.group);
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