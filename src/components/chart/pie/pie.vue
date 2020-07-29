<template>
  <div class="pie">
    <div class="chart__retouch">
      <ICountUp
        :delay="count.delay"
        :endVal="total"
        :options="count.options"
      />
    </div>
    <div
      class="chart"
      ref="chart"
    >
    </div>
    <div class="slider">
      <div
        class="slider__item"
        v-for="(item,index) in pieData"
        :key="index"
      >
        <div class="item-title">
          <div
            class="point"
            :style="{background:color[index]}"
          ></div>
          <div class="name">{{item.name}}</div>
        </div>
        <div class="info">
          <div class="percentage">
            <ICountUp
              :delay="count.delay"
              :endVal="~~(item.value/total*100)"
              :options="count.options"
            />%</div>
          <div class="nums">
            <ICountUp
              :delay="count.delay"
              :endVal="item.value"
              :options="count.options"
            />项</div>
        </div>

      </div>
    </div>
  </div>
</template>

<script>
import echarts from "echarts";
import ICountUp from "vue-countup-v2";

export default {
  name: "vPie",
  mounted() {
    this.initEchart();
  },
  components: {
    ICountUp
  },
  computed: {
    chart() {
      return this.$refs.chart;
    },
    count() {
      return {
        delay: 800,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: "",
          decimal: ".",
          prefix: "",
          suffix: ""
        }
      };
    },
    total() {
      return this.pieData.reduce((acc, item) => acc + item.value, 0);
    }
  },
  props: {
    pieData: {
      type: Array,
      default: [
        { value: 335, name: "绿化" },
        { value: 310, name: "污水" },
        { value: 234, name: "供水" },
        { value: 135, name: "燃气" },
        { value: 111, name: "垃圾" }
      ]
    }
  },
  data() {
    return {
      pie: null,
      color: ["#64F3DF", "#2256D9", "#EE3A80", "#5F20D2", "#0ED287"],
      options: {
        series: [
          {
            type: "pie",
            name: "访问来源",
            radius: ["69", "80"],
            avoidLabelOverlap: false,
            label: {
              show: false,
              position: "center"
            },
            labelLine: {
              show: false
            },
            minAngle: 0
          }
        ]
      }
    };
  },
  methods: {
    setData({ data = this.pieData, color = this.color } = {}) {
      this.pie.setOption({
        series: {
          data,
          color
        }
      });
    },
    initEchart() {
      this.pie = echarts.init(this.chart);
      this.pie.setOption(this.options);
      this.setData();
    }
  }
};
</script>

<style lang="scss" scoped>
.pie {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  position: relative;
  .chart {
    width: 234px;
    flex: none;
  }
  .chart__retouch {
    position: absolute;
    width: 234px;
    height: 100%;
    background: url("~@/assets/images/piecenter.png") no-repeat center;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #02eaff;
    font-size: 30px;
    font-weight: 600;
    padding-top: 35px;
  }
  .slider {
    flex: auto;
    display: flex;
    flex-direction: column;
    justify-content: center;
    .slider__item {
      width: 100%;
      height: 60px;
      color: #fff;
      border-bottom: 1px solid #000;
      border-image: linear-gradient(
          to right,
          rgba(48, 207, 255, 1),
          rgba(48, 207, 255, 0)
        )
        10 10;
      display: flex;
      align-items: center;
      justify-content: space-between;
      padding-right: 10px;
      cursor: pointer;
      &:nth-last-child(1) {
        border-bottom-width: 0px;
      }
      .item-title {
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        width: 40%;
        height: 100%;
        .point {
          width: 16px;
          height: 16px;
          background-color: #64f3df;
          border-radius: 50%;
          margin-top: -1px;
        }
        .name {
          color: #ffffff;
          font-size: 18px;
          font-weight: 600;
        }
      }
      .info {
        width: 60%;
        height: 100%;
        display: flex;
        justify-content: space-between;
        align-items: center;
        flex-direction: row;
        padding-left: 20px;
        .percentage {
          color: #02eaff;
          font-size: 16px;
          font-weight: 600;
        }
        .nums {
          color: #02eaff;
          font-size: 16px;
          font-weight: 600;
        }
      }
    }
  }
}
</style>