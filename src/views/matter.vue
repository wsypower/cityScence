
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
        v-if='officeData'
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
import {
  getTjsxfl,
  getZhsj,
  getTjfx,
  getSxTop5,
  getBjqs,
  getBmplTop10
} from "../api/matter";

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
  mounted() {
    this._getTjsxfl();
    this._getTjfx();
    this._getSxTop5();
    this._getBmplTop10();
    this._getBjqs();
  },
  activated() {
    this._getTjsxfl();
    this._getTjfx();
    this._getSxTop5();
    this._getBmplTop10();
    this._getBjqs();
  },
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
      matterTopIndex: 0,
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
      statisticalIndex: 0,
      statistical: [
        { name: "今天" },
        { name: "本月" },
        { name: "本年" },
        { name: "累计" }
      ],
      statisticalData: [],
      /*=============================
      =         部门排列TOP10         =
      ===============================*/
      department: [{ name: "按月度受理数" }, { name: "按月度办结数" }],
      departmentDatasIndex: 0,
      departmentDatas: [],
      /*=============================
      =            办件趋势           =
      ===============================*/
      office: [{ name: "本周" }, { name: "本月" }, { name: "本年" }],
      officeDataIndex: 0,
      officeData: null
      // officeData: {
      //   "06-06": 150,
      //   "06-07": 220,
      //   "06-08": 170,
      //   "06-09": 180,
      //   "06-10": 190,
      //   "06-11": 260,
      //   "06-12": 150,
      //   "06-13": 160,
      //   "06-14": 150,
      //   "06-15": 130,
      //   "06-16": 140,
      //   "06-17": 120
      // },
    };
  },
  methods: {
    /**
     * @description
     * 时间top 选项卡回调
     */
    matterTopChangeHandler(data) {
      this.matterTopIndex = data.index === 3 ? "" : data.index;
      this._getSxTop5();
    },
    /**
     * @description
     * 部门排列TOP10 选项卡回调
     */
    departmentTabChange(data) {
      this.departmentDatasIndex = data.index === 3 ? "" : data.index;
      this._getBmplTop10();
    },
    statisticalTabChange(data) {
      this.statisticalIndex = data.index === 3 ? "" : data.index;
      this._getTjfx();
    },
    officeTabChange(data) {
      this.officeDataIndex = data.index === 3 ? "" : data.index;
      this._getBjqs();
    },
    /* 异步接口 */
    _getTjsxfl() {
      return getTjsxfl()
        .then(res => {
          this.pieData = res.sxfl.map(v => {
            return {
              value: ~~v["count"].slice(0, -1),
              name: v["name"],
              per: v["per"].slice(0, -1)
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getZhsj() {
      return getZhsj()
        .then(res => {})
        .catch(err => {
          console.log(err);
        });
    },
    _getTjfx() {
      const map = {
        dsl: "待受理",
        bysl: "不予受理",
        ysl: "已受理",
        ybj: "已办结",
        wbj: "未办结",
        bqbz: "补齐补正"
      };
      return getTjfx({ type: this.statisticalIndex })
        .then(res => {
          this.statisticalData = [
            { name: map["dsl"], value: ~~res["dsl"] },
            { name: map["ysl"], value: ~~res["ysl"] },
            { name: map["bysl"], value: ~~res["dsbysll"] },
            { name: map["ybj"], value: ~~res["ybj"] },
            { name: map["wbj"], value: ~~res["wbj"] },
            { name: map["bqbz"], value: ~~res["bqbz"] }
          ];
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getSxTop5() {
      return getSxTop5({ type: this.matterTopIndex })
        .then(res => {
          this.matterTopDatas = res.map(item => {
            return {
              name:
                item["name"].length > 20
                  ? item["name"].slice(0, 20) + "..."
                  : item["name"],
              value: ~~item["count"]
            };
          });
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getBjqs() {
      return getBjqs({ type: this.officeDataIndex })
        .then(res => {
          console.log(res);
          this.officeData = res.reduce((acc, val) => {
            const k =
              this.officeDataIndex !== 2 ? val["date"].slice(5) : val["date"];
            acc[k] = val["count"];
            return acc;
          }, {});
        })
        .catch(err => {
          console.log(err);
        });
    },
    _getBmplTop10() {
      return getBmplTop10({ type: this.departmentDatasIndex })
        .then(res => {
          this.departmentDatas = res.map(item => {
            return { name: item["deptname"], value: ~~item["count"] };
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
.matter {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 112px 30px 121px 30px;
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