
<template>
  <div class="matter">
    <v-card-base
      title='事项TOP5'
      :width="447"
      :height="322"
      :buttons="matterButtons"
      scroll
    >
      <div class="ceshi">1123123</div>
      <div class="ceshi">1123123</div>
      <div class="ceshi">1123123</div>
      <div class="ceshi">1123123</div>
      <div class="ceshi">1123123</div>
      <div class="ceshi">1123123</div>
      <div class="ceshi">1123123</div>

    </v-card-base>
  </div>
</template>

<script>
import cardBase from "@/components/card/card-base/card-base.vue";
export default {
  name: "matter",
  components: {
    [cardBase.name]: cardBase
  },
  data() {
    return {
      matterButtons: [{ name: "本月本月" }, { name: "本月" }, { name: "本月" }]
    };
  }
};
</script>

<style lang="scss" scoped>
.matter {
  width: 100%;
  height: 100%;
  .ceshi {
    width: 100px;
    height: 100px;
    background-color: red;
    margin-bottom: 10px;
    color: #fff;
  }
}
</style>