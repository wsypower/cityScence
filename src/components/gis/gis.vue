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
  props: {
    area: {
      type: Array
    }
  },
  data() {
    return {
      scene: null,
      layer: null,
      group: null,
      pathGroup: null,
      path: []
    };
  },
  watch: {
    area: {
      deep: true,
      handler(newValue, oldValue) {
        this.path.forEach((item, i) => {
          const index = newValue.findIndex(v => v.name === item.city);
          item.update(newValue[index]);
        });
      }
    }
  },
  mounted() {
    this.initLayer();
    this.initGroupItem();
  },

  beforeDestroy() {
    this.group.removeAllChildren();
    this.pathGroup.removeAllChildren();
    this.path.forEach((item, i) => {
      item.remove();
    });
    this.path = null;
    console.log("销毁了！！！！");
  },
  methods: {
    initLayer() {
      this.scene = new Scene({
        container: this.gis,
        width: this.w,
        height: this.h
        // bufferSize: 0,
        // contextType: "2d"
      });
      this.layer = this.scene.layer();
      this.group = new Group();
      this.pathGroup = new Group();
      this.initGroup();
    },
    initGroup() {
      this.group.attr({
        width: this.w,
        height: this.h,
        pos: [0, 0]
      });
      this.pathGroup.attr({
        width: this.w,
        height: this.h,
        pos: [0, 0]
      });
      this.layer.append(this.group);
      this.layer.append(this.pathGroup);
      const out = new drawOut();
      out.init({ Group: this.group });
    },
    initGroupItem() {
      const group = this.pathGroup;
      this.area.forEach(are => {
        const path = new drawPath();
        const drow = path.init({ ...are, group });
        this.path.push(drow);
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