<template>
  <div class="line__warp">
    <div
      class="line"
      ref="line"
    >
    </div>
    <div class="line__bootom"></div>
  </div>

</template>

<script>
import echarts from "echarts";
export default {
  name: "vLine",
  mounted() {
    this.init();
  },
  computed: {
    // xData() {
    //   return;
    // }
  },
  props: {
    xData: {
      type: Array
    },
    yData: {
      type: Array
    }
  },
  data() {
    return {
      lineChart: null,
      options: {
        grid: {
          top: "15",
          left: "40",
          right: "50",
          bottom: "15",
          containLabel: true
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: this.xData,
          axisLine: {
            margin: 30,

            //  改变x轴颜色
            lineStyle: {
              color: "#02E3FC"
            }
          },

          axisLabel: {
            //  改变x轴字体颜色和大小
            textStyle: {
              color: "#fff",
              fontSize: 13,
              fontWeight: 800
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#0C4356"],
              width: 1,
              type: "solid"
            }
          }
        },
        yAxis: {
          type: "value",
          offset: 20,
          axisLine: {
            //  改变y轴颜色
            show: false,
            lineStyle: {
              color: "#26D9FF"
            }
          },
          axisLabel: {
            //  改变y轴字体颜色和大小
            textStyle: {
              color: "#fff",
              fontSize: 13
            }
          },
          axisTick: {
            show: false
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: ["#0C4356"],
              width: 1,
              type: "solid"
            }
          }
        },
        series: [
          {
            smooth: true,
            symbol: "circle",
            symbolSize: 7,
            markPoint: {
              symbol: "circle"
            },
            data: this.yData,
            type: "line",
            itemStyle: {
              normal: {
                label: {
                  show: false,
                  color: "#fff",
                  fontSize: 12
                },
                color: "#FCB23B",
                borderColor: "#0E1B2D",
                borderWidth: 2
              }
            },
            lineStyle: {
              normal: {
                width: 2,
                color: "#B09728",
                shadowColor: "#978422",
                shadowBlur: 10
              }
            },
            areaStyle: {
              color: {
                type: "linear",
                x: 0,
                y: 0,
                x2: 0,
                y2: 1,
                colorStops: [
                  {
                    offset: 0,
                    color: "#B19832" // 0% 处的颜色
                  },
                  {
                    offset: 0.5,
                    color: "rgba(184,157,42,0.5)" // 0% 处的颜色
                  },
                  {
                    offset: 1,
                    color: "rgba(184,157,42,0)" // 100% 处的颜色
                  }
                ],
                global: false // 缺省为 false
              }
            }
          }
        ]
      }
    };
  },
  computed: {
    line() {
      return this.$refs.line;
    }
  },
  watch: {
    xData(newValue, oldValue) {
      this.lineChart.setOption({
        xAxis: {
          data: newValue
        }
      });
    },
    yData(newValue, oldValue) {
      this.lineChart.setOption({
        series: [
          {
            data: newValue
          }
        ]
      });
    }
  },
  methods: {
    init() {
      this.lineChart = echarts.init(this.line);
      this.lineChart.setOption(this.options);
    }
  }
};
</script>

<style lang="scss" scoped>
.line__warp {
  width: 100%;
  height: 100%;
  position: relative;
}
.line {
  width: 100%;
  height: 100%;
}
.line__bootom {
  position: absolute;
  width: 750px;
  height: 2px;
  bottom: 34px;
  left: 47px;
  z-index: 10;
  background-color: #02c1d9;
}
</style>