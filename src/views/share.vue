<template>
  <div class="share">
    <!-- 装饰性的 -->
    <div class="wing">
      <div class="wing__left"></div>
      <div class="wing__right"></div>
      <div
        class="wing__center"
        v-if="router==='project'"
      >
        <v-level
          :title="proLevelTiele"
          :level="proLevel"
        ></v-level>
      </div>
      <div
        class="buttons-center"
        v-if="router==='project'"
      >
        <div
          class="buttons-item"
          v-for="(item, index) in buttons"
          :key="index"
        >
          <div
            class="buttons__content"
            :class='{active:index===buttonsIndex}'
            @click="buttonsHandlerClick(index)"
          >{{item}}</div>
        </div>
      </div>
    </div>
    <div class="map__gis">
      <div class="layout__left">
        <!-- share 页面 -->
        <div
          class="left__slider"
          v-if="router==='share'"
        >
          <v-card :height="549">
            <v-card-base
              title='图层选择'
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
                <v-level
                  :title="shareLevelTiele"
                  :level="shareLevel"
                ></v-level>
              </div>
            </v-card-base>
          </v-card>
        </div>
        <!-- project 页面 -->
        <div
          class="left__slider project__slider"
          v-if="router==='project'"
        >
          <v-card :height="549">
            <v-card-base
              title='项目图层'
              :width="261"
              :height="468"
            >
              <v-radio
                class="border-botoom-gr"
                :radioOptions.sync="itemLayer"
                @radioChange='shareRadioChaneg'
              ></v-radio>
            </v-card-base>
          </v-card>
        </div>
      </div>
      <div class="gis">
        <v-proton></v-proton>
        <v-gis
          :area.sync='area'
          class="map__gis__canvas"
        ></v-gis>
      </div>
      <div class="layout__right">
        <!-- share -->
        <div
          class="right__slider"
          v-if="router==='share'"
        >
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
              title='指数排名'
              :width="290"
              :height="382"
            >
              <v-share-line :lineData="indexRanking"></v-share-line>
            </v-card-base>
          </v-card>
        </div>
        <!-- 项目仓 -->
        <div
          class="right__slider"
          v-if="router==='project'"
        >
          <v-card :height="858">
            <v-project
              :aims.sync='aims'
              :completionRate.sync='completionRate'
            ></v-project>
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
import shareLineVue from "../components/chart/line/share-line.vue";
import Object from "spritejs";
import vProton from "@/components/proton/proton.vue";
import vProject from "@/components/view/project/project.vue";
export default {
  name: "share",
  components: {
    [gis.name]: gis,
    [card.name]: card,
    [cardBase.name]: cardBase,
    [vRadio.name]: vRadio,
    [levelVue.name]: levelVue,
    [vShareBar.name]: vShareBar,
    [shareLineVue.name]: shareLineVue,
    [vProton.name]: vProton,
    [vProject.name]: vProject
  },
  mounted() {
    // this.router = this.$route.query.routers;
    console.log('初始化加载')
  },
  computed: {
    waringList() {
      return changeBarData({
        data: this.warningDatas,
        colors: ["#E2111B", "#FF8400", "#FFEA00", "#02EAFF"],
        boundary: 3
      });
    },
    buttons() {
      return ["供水节水", "污水处理", "城市排涝"];
    },
    router() {
      console.log(this.$store.state.router);
      return this.$store.state.router.slice(1);
    }
  },
  data() {
    return {
      buttonsIndex: 0,
      // router: "project", // project  // share
      // 图层选择图例
      shareLevelTiele: "图例",
      shareLevel: [
        {
          color: "green",
          name: "优秀（≤6.13%）"
        },
        {
          color: "yellow",
          name: "合格（6.13<x≤10%）"
        },
        {
          color: "red",
          name: "不合格（>10%）"
        },
        {
          color: "gray",
          name: "无数据"
        }
      ],
      // 项目
      proLevelTiele: "建成率",
      proLevel: [
        {
          color: "green",
          name: "≥100%"
        },
        {
          color: "yellow",
          name: "80%~100%"
        },
        {
          color: "orange",
          name: "30%~80%"
        },
        {
          color: "red",
          name: "≤30%"
        },
        {
          color: "gray",
          name: "无数据"
        }
      ],
      // 图层选择
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
      itemLayer: {
        default: 1,
        options: [
          { value: 1, name: "新建供水管网" },
          { value: 2, name: "改造供水管网" },
          { value: 3, name: "新增供水能力" },
          { value: 4, name: "改造二次供水设施" },
          { value: 5, name: "城乡供水一体化部分" },
          { value: 6, name: "新建雨水收集系统" },
          { value: 7, name: "新建节水器具" },
          { value: 8, name: "改造一户一表" }
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
      // 目标
      aims: [
        { name: "全省年度建成目标(公里)", value: 1500 },
        { name: "全省年度建成数量(公里)", value: 1200 },
        { name: "全省年度建成率(%)", value: 900 },
        { name: "全省年度投资额(万元)", value: 800 }
      ],
      // 建成率排名
      completionRate: [
        { name: "杭州", value: 1800, percentage: 30 },
        { name: "宁波", value: 2800, percentage: 40 },
        { name: "温州", value: 800, percentage: 50 },
        { name: "湖州", value: 600, percentage: 60 },
        { name: "金华", value: 400, percentage: 70 },
        { name: "台州", value: 80, percentage: 80 },
        { name: "绍兴", value: 800, percentage: 90 },
        { name: "嘉兴", value: 800, percentage: 10 },
        { name: "舟山", value: 800, percentage: 20 },
        { name: "衢州", value: 800, percentage: 30 },
        { name: "丽水", value: 800, percentage: 30 }
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
      ],
      indexRanking: [
        { name: "杭州市", value: 1500 },
        { name: "宁波市", value: 1200 },
        { name: "温州市", value: 900 },
        { name: "台州市", value: 800 },
        { name: "绍兴市", value: 700 },
        { name: "嘉兴市", value: 600 },
        { name: "丽水市", value: 500 },
        { name: "衢州市", value: 400 },
        { name: "湖州市", value: 400 },
        { name: "舟山市", value: 400 },
        { name: "金华市", value: 400 }
      ]
    };
  },
  methods: {
    buttonsHandlerClick(index) {
      console.log(index);
      this.buttonsIndex = index;
    },
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
  position: relative;

  .map__gis {
    width: 100%;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    z-index: 18;
    .gis {
      width: 961px;
      height: 100%;
      position: relative;
      .map__gis__canvas {
        position: relative;
        top: -876px;
        right: -13px;
      }
    }
    .layout__left {
      display: flex;
      flex: auto;
      height: 100%;
      display: flex;
      align-items: center;
      padding-left: 30px;
      transform: perspective(1200px) rotateY(10deg);
      transform-style: preserve-3d;
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
      position: relative;
      top: -30px;
      display: flex;
      flex: auto;
      height: 100%;
      display: flex;
      flex-direction: row-reverse;
      padding-right: 30px;
      transform: perspective(1200px) rotateY(350deg);
      transform-style: preserve-3d;
      .right__slider {
        width: 328px;
        height: 100%;
      }
    }
  }
  .wing {
    width: 1200px;
    height: 641px;
    position: absolute;
    top: 264px;
    left: 350px;
    .wing__left {
      width: 191px;
      height: 574px;
      background: url("~@/assets/images/wing-left.png");
      position: absolute;
      top: 0px;
      left: 0px;
    }
    .wing__right {
      width: 191px;
      height: 574px;
      background: url("~@/assets/images/wing-right.png");
      position: absolute;
      top: 0px;
      right: 0px;
    }
    .wing__center {
      width: 200px;
      height: 200px;
      position: absolute;
      bottom: 90px;
      right: 50px;
    }
    .buttons-center {
      position: absolute;
      width: 490px;
      height: 50px;
      top: -125px;
      left: 50%;
      transform: translateX(-50%);
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      z-index: 100;
      .buttons-item {
        width: 150px;
        height: 50px;
        color: #fff;
        display: flex;
        justify-content: center;
        align-items: center;
        font-size: 20px;
        font-weight: 600;
        cursor: pointer;
        .buttons__content {
          width: 100%;
          height: 100%;
          display: flex;
          justify-content: center;
          align-items: center;
          background: url("~@/assets/images/buttons-bc.png");
          cursor: pointer;
          transition: all 0.3s;
        }
        .buttons__content.active {
          background: url("~@/assets/images/buttons-ba-active.png");
        }
      }
    }
  }
}
</style>