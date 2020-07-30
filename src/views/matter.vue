
<!--
 * @Description: 
 * @Author: huacong
 * @Date: 2020-07-28 22:32:36
 * @LastEditTime: 2020-07-30 11:47:35
 * @LastEditors: huacong
--> 

<template>
  <div class="matter">
    <div class="layout-left">
      <v-card :height='775'>
        <v-card-base
          title='统建事项分类'
          :width="447"
          :height="314"
        >
          <v-pie :pieData.sync=pieData></v-pie>
        </v-card-base>
        <v-card-base
          title='事项 TOP 5'
          :width="447"
          :height="322"
          :buttons="matterTop"
          @tabChangeHandler='matterTopChangeHandler'
        >
          <div class="bars">
            <v-bar
              v-for="(item, index) in matterTopData"
              :key="index"
              :names.sync="item.name"
              :value.sync="item.value"
              :color="item.color"
              :percentage.sync="item.percentage"
              :index="index"
            ></v-bar>
          </div>
        </v-card-base>
      </v-card>
    </div>
    <div class="layout-center">
      <div class="center__controller"></div>
      <v-card-base
        title='办件趋势'
        :width="819"
        :height="212"
        :buttons="office"
        @tabChangeHandler="officeTabChange"
      >
        <v-line
          :xData.sync="Object.keys(officeData)"
          :yData.sync="Object.values(officeData)"
        ></v-line>
      </v-card-base>
    </div>
    <div class="layout-right">
      <v-card :height='775'>
        <v-card-base
          title='统计分析'
          :width="447"
          :height="227"
          :buttons="statistical"
          @tabChangeHandler="statisticalTabChange"
        >
          <div class="car-items">
            <v-car
              v-for="(item, index) in statisticalData"
              :key="index"
              :value.sync="item.value"
              :name.sync="item.name"
            ></v-car>
          </div>

        </v-card-base>
        <v-card-base
          title='部门排列 TOP 10'
          :width="447"
          :height="411"
          :buttons="department"
          @tabChangeHandler='departmentTabChange'
          scroll
        >
          <div class="bars">
            <v-bar
              v-for="(item, index) in departmentData"
              :key="index"
              :names.sync="item.name"
              :value.sync="item.value"
              :color="item.color"
              :percentage.sync="item.percentage"
              :index="index"
            ></v-bar>
          </div>
        </v-card-base>
      </v-card>
    </div>

  </div>
</template>

<script>
import cardBase from "@/components/card/card-base/card-base.vue";
import card from "@/components/card/card/card.vue";
import vPie from "@/components/chart/pie/pie.vue";
import car from "@/components/view/car/car.vue";
import bar from "@/components/chart/bar/bar.vue";
import { changeBarData } from "@/utils/view";
import line from "@/components/chart/line/line.vue";
export default {
  name: "matter",
  components: {
    [cardBase.name]: cardBase,
    [card.name]: card,
    [vPie.name]: vPie,
    [car.name]: car,
    [bar.name]: bar,
    [line.name]: line
  },
  mounted() {},
  computed: {
    departmentData() {
      return changeBarData({
        data: this.departmentDatas,
        colors: ["#02EAFF", "#02EAFF", "#02EAFF", "#0661EF"],
        boundary: 3
      });
    },
    matterTopData() {
      return changeBarData({
        data: this.matterTopDatas,
        colors: ["#EF377E", "#FFC726", "#00BBCF"],
        boundary: 2
      });
    }
  },
  data() {
    return {
      /*=============================
      =           统建事项分类        =
      ===============================*/
      pieData: [
        { value: 335, name: "绿化" },
        { value: 310, name: "污水" },
        { value: 234, name: "供水" },
        { value: 135, name: "燃气" },
        { value: 111, name: "垃圾" }
      ],

      /*=============================
      =            事项TOP5          =
      ===============================*/
      matterTop: [
        { name: "本周" },
        { name: "本月" },
        { name: "本年" },
        { name: "累计" }
      ],
      matterTopDatas: [
        { name: "燃气许可合法、延续事项", value: 233 },
        { name: "垃圾运输许可", value: 213 },
        { name: "移植古树名木", value: 205 },
        { name: "占用零时绿地", value: 198 },
        { name: "燃气许可核发", value: 168 }
      ],
      /*=============================
      =           统计分析           =
      ===============================*/
      statistical: [
        { name: "今天" },
        { name: "本月" },
        { name: "本年" },
        { name: "累计" }
      ],
      statisticalData: [
        { name: "待受理", value: 1500 },
        { name: "已受理", value: 52500 },
        { name: "已办结", value: 3500 },
        { name: "已退回", value: 5500 },
        { name: "逾期未办结", value: 70 },
        { name: "逾期已办结", value: 120 }
      ],
      /*=============================
      =         部门排列TOP10         =
      ===============================*/
      department: [{ name: "按月度受理数" }, { name: "按月度办结数" }],
      departmentDatas: [
        { name: "杭州市上城区城管局", value: 1500 },
        { name: "宁波市住建局", value: 1200 },
        { name: "温州市执法局", value: 900 },
        { name: "湖州市城管局", value: 800 },
        { name: "绍兴市城管局", value: 700 },
        { name: "台州市城管局", value: 600 },
        { name: "湖州城管局", value: 500 },
        { name: "杭州市余杭区执法局", value: 400 },
        { name: "杭州市西湖区城管局", value: 300 },
        { name: "台州市住建局", value: 200 }
      ],
      /*=============================
      =            办件趋势           =
      ===============================*/
      office: [{ name: "本周" }, { name: "本月" }, { name: "本年" }],
      officeData: {
        "06-06": 150,
        "06-07": 220,
        "06-08": 170,
        "06-09": 180,
        "06-10": 190,
        "06-11": 260,
        "06-12": 150,
        "06-13": 160,
        "06-14": 150,
        "06-15": 130,
        "06-16": 140,
        "06-17": 120
      }
    };
  },
  methods: {
    /**
     * @description
     * 时间top 选项卡回调
     */
    matterTopChangeHandler(data) {
      console.log(data);
    },
    /**
     * @description
     * 部门排列TOP10 选项卡回调
     */
    departmentTabChange(data) {
      console.log(data);
    },
    statisticalTabChange(data) {
      console.log(data);
    },
    officeTabChange(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.matter {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 30px;
  justify-content: space-between;
  .layout-left {
    height: 100%;
    width: 487px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .layout-center {
    height: 100%;
    width: 819px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 52px;
    .center__controller {
      width: 100%;
      height: calc(100% - 212px);
      background: url("~@/assets/images/shixiangcang.png") no-repeat center -100px;
    }
  }
  .layout-right {
    height: 100%;
    width: 487px;
    display: flex;
    justify-content: center;
    align-items: center;
    .car-items {
      width: 100%;
      height: 100%;
      display: flex;
      flex-direction: row;
      flex-wrap: wrap;
      justify-content: space-around;
      padding: 15px 30px;
    }
  }
  .bars {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    flex-direction: column;
    align-items: center;
    padding: 10px 0px;
  }
}
</style>