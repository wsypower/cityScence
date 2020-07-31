<template>
  <div class="share">
    <div class="map__gis">
      <div class="layout__left">
        <div class="left__slider">
          <v-card :height="549">
            <v-card-base
              title='项目图层'
              :width="261"
              :height="468"
            >
              <div class="single__choice">
                <v-radio
                  class="border-botoom-gr"
                  :border='true'
                  :radioOptions.sync="radioData"
                  @radioChange='shareRadioChaneg'
                ></v-radio>
              </div>
              <div class="level">
                <v-level></v-level>
              </div>
            </v-card-base>
          </v-card>
        </div>
      </div>
      <div class="gis">
        <v-gis></v-gis>
      </div>
      <div class="layout__right">
        <div class="right__slider">
          <v-card :height="858"></v-card>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import gis from "@/components/gis/gis.vue";
import card from "@/components/card/card/card.vue";
import cardBase from "@/components/card/card-base/card-base.vue";
import vRadio from "@/components/radio/radio-list.vue";
import levelVue from "../components/level/level.vue";
export default {
  name: "share",
  components: {
    [gis.name]: gis,
    [card.name]: card,
    [cardBase.name]: cardBase,
    [vRadio.name]: vRadio,
    [levelVue.name]: levelVue
  },
  mounted() {},
  data() {
    return {
      router: "share",
      radioData: {
        default: 1,
        options: [
          { value: 1, name: "城市供水区域漏损图层" },
          { value: 2, name: "城市再生水利用率图层" },
          {
            value: 3,
            name: "城市污水监督性检测达标图层"
          }
        ]
      }
    };
  },
  computed: {},
  methods: {
    shareRadioChaneg(e) {
      console.log(e);
    }
  }
};
</script>

<style lang="scss" scoped>
.share {
  width: 100%;
  height: 100%;
  padding: 112px 0px;
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
    .layout__left {
      display: flex;
      flex: auto;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 30px;
      .left__slider {
        width: 302px;
        height: 577px;
        display: flex;
        flex-direction: column;
        .single__choice {
          width: 100%;
          height: 50%;
        }
        .level {
          width: 100%;
          height: 50%;
          padding-left: 20px;
          padding-top: 15px;
        }
      }
    }
    .layout__right {
      display: flex;
      flex: auto;
      height: 100%;
      display: flex;
      align-items: center;
      flex-direction: row-reverse;
      padding-right: 30px;
      .right__slider {
        width: 328px;
        height: 831px;
      }
    }
  }
}
</style>