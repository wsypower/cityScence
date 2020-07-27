<template>
  <div class="home">
    <div class="card__containr">
      <div class="rotate">
        <float-card-warp class="card-warp">
          <div class="card">800</div>
        </float-card-warp>
      </div>
    </div>
    <div class="features"></div>
  </div>
</template>
<script>
import cardFloatWarp from "@/components/card/card-warp/float-card-warp.vue";
export default {
  name: "index",
  components: {
    [cardFloatWarp.name]: cardFloatWarp
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  .card__containr {
    width: 100%;
    height: 396px;
    z-index: 20;
    position: absolute;
    // background-color: darkgray;
  }
  .features {
    position: absolute;
    width: 100%;
    height: 582px;
    bottom: 0px;
    // background: url("~@/assets/images/indemain.png") no-repeat center center;
  }
  .rotate {
  }
  .card-warp {
    display: inline-block;
    margin: 18px;
  }
  .card {
    width: 100%;
    height: 100%;
    font-size: 60px;
    color: #fff;
    font-weight: 600;
  }
}
</style>