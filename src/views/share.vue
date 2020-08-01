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
        <v-gis :area.sync='area'></v-gis>
      </div>
      <div class="layout__right">
        <div class="right__slider">
          <v-card :height="858">
            <v-card-base
              title='预警列表'
              :width="290"
              :height="323"
              scroll
            >
              <v-share-bar
                v-for="(item, index) in waringList"
                :key="index"
                :percentage='item.percentage'
                :index="index+1"
                :value='item.value'
                :names="item.name"
                :color='item.color'
              ></v-share-bar>
            </v-card-base>
            <v-card-base
              title='预警列表'
              :width="290"
              :height="382"
            >
            </v-card-base>
          </v-card>
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
import vShareBar from "@/components/view/share/bar.vue";
import { changeBarData } from "@/utils/view";
export default {
  name: "share",
  components: {
    [gis.name]: gis,
    [card.name]: card,
    [cardBase.name]: cardBase,
    [vRadio.name]: vRadio,
    [levelVue.name]: levelVue,
    [vShareBar.name]: vShareBar
  },
  mounted() {},
  computed: {
    waringList() {
      return changeBarData({
        data: this.warningDatas,
        colors: ["#E2111B", "#FF8400", "#FFEA00", "#02EAFF"],
        boundary: 3
      });
    }
  },
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
      },
      // 预警列表
      warningDatas: [
        { name: "杭州市", value: 1500 },
        { name: "宁波市", value: 1200 },
        { name: "温州市", value: 900 },
        { name: "台州市", value: 800 },
        { name: "绍兴市", value: 700 },
        { name: "嘉兴市", value: 600 },
        { name: "金华市", value: 500 },
        { name: "丽水市", value: 400 }
      ],
      area: [
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
  methods: {
    shareRadioChaneg(e) {
      console.log(e);
      if (e === 2) {
        this.area = [
          { name: "wenzhou", color: "yellow" },
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
        ];

        this.warningDatas = [
          { name: "宁波市", value: 1200 },
          { name: "温州市", value: 900 },
          { name: "台州市", value: 800 },
          { name: "杭州市", value: 1500 },
          { name: "绍兴市", value: 700 },
          { name: "嘉兴市", value: 600 },
          { name: "金华市", value: 500 },
          { name: "丽水市", value: 400 }
        ];
      }
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
        height: 100%;
      }
    }
  }
}
</style>