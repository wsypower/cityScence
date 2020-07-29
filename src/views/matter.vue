<!--
 * @Description: 
 * @Author: huacong
 * @Date: 2020-07-28 22:32:36
 * @LastEditTime: 2020-07-29 19:09:03
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
          title='事项TOP5'
          :width="447"
          :height="322"
          :buttons="matterTop"
          @tabChangeHandler='matterTopChangeHandler'
        >
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
          title='部门排列 TOP10'
          :width="447"
          :height="411"
          :buttons="department"
          @tabChangeHandler='departmentTabChange'
          scroll
        >
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
export default {
  name: "matter",
  components: {
    [cardBase.name]: cardBase,
    [card.name]: card,
    [vPie.name]: vPie,
    [car.name]: car
  },
  mounted() {},
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
      matterTop: [
        { name: "本周" },
        { name: "本月" },
        { name: "本年" },
        { name: "累计" }
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
        { name: "待受理", value: 500 },
        { name: "已受理", value: 500 },
        { name: "已办结", value: 500 },
        { name: "已退回", value: 500 },
        { name: "逾期未办结", value: 500 },
        { name: "逾期已办结", value: 500 }
      ],
      department: [{ name: "按月度受理数" }, { name: "按月度办结数" }],
      office: [{ name: "本周" }, { name: "本月" }, { name: "本年" }]
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
      padding: 0 30px;
    }
  }
}
</style>