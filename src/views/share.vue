<template>
  <div class="share">
    <div class="map__gis">
      <div class="gis">
        <v-gis></v-gis>
      </div>
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
  computed: {}
};
</script>

<style lang="scss" scoped>
.share {
  width: 100%;
  height: 100%;
  padding: 112px 121px;
  background: url("~@/assets/images/share.png") no-repeat;
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