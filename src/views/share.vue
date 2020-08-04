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
                  :defaultType.sync="radioDataType"
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
                :defaultType.sync="itemLayerType"
                @radioChange='shareRadioChaneg'
              ></v-radio>
            </v-card-base>
          </v-card>
        </div>
      </div>
      <div
        class="gis"
        v-if="area.length"
      >
        <v-proton></v-proton>
        <v-gis
          :area='area'
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
                :percentage='item.value'
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
              v-if='indexRanking.length'
            >
              <v-share-line :lineData.sync="indexRanking"></v-share-line>
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
import {
  getListRadio,
  getWaterLeakageList,
  getWaterRatioList,
  getWsList
} from "../api/share";
import vProton from "@/components/proton/proton.vue";
import vProject from "@/components/view/project/project.vue";
import shareRadioList from "@/mock/share.js";
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
  created() {
    this.itemLayerType = shareRadioList[this.buttonsIndex].options[0].value;
  },
  mounted() {
    console.log("初始化加载");
    if (this.router === "project") {
      this.isMounted && this._getListRadio();
    } else {
      this.isMounted && this._getWater();
    }
    this.isMounted = false;
  },
  watch: {
    router(newValue, oldValue) {
      if (this.router === "project") {
        !this.isMounted && this._getListRadio();
      } else if (this.router === "share") {
        !this.isMounted && this._getWater(this.radioDataType);
      }
    }
  },
  activated() {
    if (this.router === "project") {
      !this.isMounted && this._getListRadio();
    } else {
      !this.isMounted && this._getWater(this.radioDataType);
    }
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
    },
    itemLayer() {
      return shareRadioList[this.buttonsIndex];
    },
    // 目标
    aims() {
      const totalMessage = this.cityData && this.cityData.totalMessage;
      if (totalMessage == null) {
        return [];
      }
      const renameKeys = {
        plan: "全省年度建成目标(公里)",
        finished: "全省年度建成数量(公里)",
        rate: "全省年度建成率(%)",
        investment: "全省年度投资额(万元)"
      };
      return [
        { name: renameKeys["plan"], value: totalMessage["plan"] },
        { name: renameKeys["finished"], value: totalMessage["finished"] },
        { name: renameKeys["rate"], value: totalMessage["rate"] },
        { name: renameKeys["investment"], value: totalMessage["investment"] }
      ];
    },
    // 建成率排名
    completionRate() {
      const cityList = this.cityData && this.cityData.cityList;
      if (cityList == null) {
        return [];
      }

      return cityList.map((val, index) => {
        return {
          name: val["cityName"],
          value: val["finished"],
          percentage: val["rate"]
        };
      });
      return [
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
      ];
    },
    // 图层选择
    radioData() {
      return {
        options: [
          { value: "1", name: "城市供水区域漏损图层" },
          { value: "2", name: "城市再生水利用率图层" },
          {
            value: "3",
            name: "城市污水监督性检测达标图层"
          }
        ]
      };
    }
  },
  data() {
    return {
      // 是否初始化加载
      isMounted: true,
      // 全数据
      cityData: null,

      //项目仓当前type
      itemLayerType: null,
      // 目标
      // aims: null,
      buttonsIndex: 0,
      // 图层选择图例
      shareLevelTiele: "图例",
      // 图层选择默认值
      radioDataType: "1",
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

      // 预警列表
      warningDatas: [],
      area: [],
      indexRanking: []
    };
  },
  methods: {
    buttonsHandlerClick(index) {
      this.buttonsIndex = index;
      this.itemLayerType = shareRadioList[index].options[0].value;
      this._getListRadio();
    },
    shareRadioChaneg(e) {
      console.log(e);
      if (this.router === "project") {
        this.itemLayerType = e;
        this._getListRadio();
      } else {
        this.radioDataType = e;
        this._getWater(e);
      }
    },
    /**
     * @description
     * 项目仓请求数据
     * @author wsy
     * @date 2020-08-04  13:04:11
     */
    _getListRadio() {
      const url = ["gjs", "pl", "ws"];
      return getListRadio(url[this.buttonsIndex], { type: this.itemLayerType })
        .then(res => {
          this.cityData = res;
          let cityList = res.cityList;
          const city = {
            杭州市: "hangzhou",
            宁波市: "ningbo",
            温州市: "wenzhou",
            台州市: "taizhou",
            绍兴市: "shaoxing",
            嘉兴市: "jiaxing",
            丽水市: "lishui",
            衢州市: "tanzhou",
            湖州市: "huzhou",
            舟山市: "zhoushan",
            金华市: "jinhua"
          };
          const calculationColor = rate => {
            if (rate >= 100) {
              return "green";
            } else if (100 > rate && rate > 80) {
              return "yellow";
            } else if ((80 > rate) & (rate > 30)) {
              return "orange";
            } else if (rate <= 30 && rate > 0) {
              return "red";
            } else {
              return "gray";
            }
          };
          this.area = cityList.map(item => {
            return {
              name: city[item["cityName"]],
              color: calculationColor(item.rate)
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @description
     * 运行仓接口转发
     * @author wsy
     * @date 2020-08-04  19:10:35
     * @param {String} index your introduction
     */
    _getWater(index) {
      switch (index) {
        case "1":
          return this._getWaterLeakageList();
        case "2":
          return this._getWaterRatioList();
        case "3":
          return this._getWsList();
        default:
          return this._getWaterLeakageList();
      }
    },
    /**
     * @description
     * 漏损率
     * @author wsy
     * @date 2020-08-04  19:10:05
     */
    _getWaterLeakageList() {
      return getWaterLeakageList()
        .then(res => {
          const city = {
            杭州市: "hangzhou",
            宁波市: "ningbo",
            温州市: "wenzhou",
            台州市: "taizhou",
            绍兴市: "shaoxing",
            嘉兴市: "jiaxing",
            丽水市: "lishui",
            衢州市: "tanzhou",
            湖州市: "huzhou",
            舟山市: "zhoushan",
            金华市: "jinhua"
          };
          const calculationColor = rate => {
            if (rate <= 6.13) {
              return "green";
            } else if (10 >= rate && rate > 6.13) {
              return "yellow";
            } else if (rate > 10) {
              return "red";
            } else {
              return "gray";
            }
          };
          const data = res.map(item => {
            return {
              ...item,
              name: item["cityName"],
              value: ~~(item.value * 100) / 100
            };
          });
          this.warningDatas = data;
          this.indexRanking = data;
          this.area = res.map(item => {
            return {
              name: city[item["cityName"]],
              color: calculationColor(item.value)
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @description
     * 再生水
     * @author wsy
     * @date 2020-08-04  19:10:13
     */
    _getWaterRatioList() {
      const city = {
        杭州市: "hangzhou",
        宁波市: "ningbo",
        温州市: "wenzhou",
        台州市: "taizhou",
        绍兴市: "shaoxing",
        嘉兴市: "jiaxing",
        丽水市: "lishui",
        衢州市: "tanzhou",
        湖州市: "huzhou",
        舟山市: "zhoushan",
        金华市: "jinhua"
      };
      const calculationColor = rate => {
        if (rate <= 6.13) {
          return "green";
        } else if (10 >= rate && rate > 6.13) {
          return "yellow";
        } else if (rate > 10) {
          return "red";
        } else {
          return "gray";
        }
      };
      return getWaterRatioList()
        .then(res => {
          const data = res.map(item => {
            return {
              ...item,
              name: item["cityName"],
              value: ~~(item.value * 100) / 100
            };
          });
          this.warningDatas = data;
          this.indexRanking = data;
          this.area = res.map(item => {
            return {
              name: city[item["cityName"]],
              color: calculationColor(item.value)
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    /**
     * @description
     * 污水检测
     * @author wsy
     * @date 2020-08-04  19:10:21
     */
    _getWsList() {
      const city = {
        杭州市: "hangzhou",
        宁波市: "ningbo",
        温州市: "wenzhou",
        台州市: "taizhou",
        绍兴市: "shaoxing",
        嘉兴市: "jiaxing",
        丽水市: "lishui",
        衢州市: "tanzhou",
        湖州市: "huzhou",
        舟山市: "zhoushan",
        金华市: "jinhua"
      };
      const calculationColor = rate => {
        if (rate <= 6.13) {
          return "green";
        } else if (10 >= rate && rate > 6.13) {
          return "yellow";
        } else if (rate > 10) {
          return "red";
        } else {
          return "gray";
        }
      };
      return getWsList()
        .then(res => {
          const data = res.map(item => {
            return {
              ...item,
              name: item["cityName"],
              value: ~~(item.value * 100) / 100
            };
          });

          this.warningDatas = data;
          this.indexRanking = data;
          this.area = res.map(item => {
            return {
              name: city[item["cityName"]],
              color: calculationColor(item.value)
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
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