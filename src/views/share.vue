<template>
  <div
    class="share"
    :style="{width:windoW,height:windoH}"
  >
    <div class="map__gis">
      <!-- <div class="gis">
        <v-gis></v-gis>
      </div> -->
    </div>
  </div>
</template>

<script>
import gis from "@/components/gis/gis.vue";
export default {
  name: "share",
  components: {
    [gis.name]: gis
  },
  mounted() {},
  computed: {
    windoW() {
      return document.getElementById("app").clientWidth;
    },
    windoH() {
      return document.getElementById("app").clientHeight;
    }
  }
};
</script>

<style lang="scss" scoped>
.share {
  width: 100%;
  height: 100%;
  .map__gis {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .gis {
      width: 961px;
      height: 100%;
    }
  }
}
</style>