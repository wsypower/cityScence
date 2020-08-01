<template>
  <div
    class="share--line"
    ref="share"
  >
    123
  </div>
</template>

<script>
import echarts from "echarts";
export default {
  name: "vShareLine",
  props: {
    lineData: {
      type: Array
    }
  },
  computed: {
    share() {
      return this.$refs.share;
    },
    options() {
      return {
        barWidth: 10,
        grid: {
          top: "15",
          left: "10",
          right: "35",
          bottom: "15",
          containLabel: true
        },
        xAxis: {
          type: "value",
          splitLine: {
            lineStyle: {
              color: "#0284F2",
              type: "dashed"
            }
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false,
            //  改变x轴颜色
            lineStyle: {
              color: "#26D9FF"
            }
          },
          axisLabel: {
            //  改变x轴字体颜色和大小
            textStyle: {
              color: "#0855a3",
              fontSize: 14,
              fontWeight: 600
            }
          }
        },
        yAxis: {
          type: "category",
          data: this.lineData.map(v => v.name),
          splitLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLine: {
            //  改变y轴颜色
            lineStyle: {
              color: "#26D9FF"
            }
          },
          axisLabel: {
            textStyle: {
              color: "#ffffff",
              fontSize: 14,
              fontWeight: 600
            }
          }
        },
        series: [
          {
            type: "bar",
            itemStyle: {
              normal: {
                label: {
                  show: true, //开启显示
                  position: "right", //在上方显示
                  textStyle: {
                    //数值样式
                    color: "#02EAFF",
                    fontSize: 14,
                    fontWeight: 600
                  }
                },
                color: "#02EAFF"
              }
            },
            data: this.lineData.map(v => v.value)
          }
        ]
      };
    }
  },
  mounted() {
    this.init();
  },
  data() {
    return {
      lineChart: null
    };
  },
  methods: {
    init() {
      this.lineChart = echarts.init(this.share);
      this.lineChart.setOption(this.options);
    }
  }
};
</script>

<style lang="scss" scoped>
.share--line {
  width: 100%;
  height: 100%;
}
</style>