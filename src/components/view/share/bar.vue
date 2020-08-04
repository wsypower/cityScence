<template>
  <div class="share__bar">
    <div class="icon">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        xmlns:xlink="http://www.w3.org/1999/xlink"
        width="24px"
        height="24px"
      >
        <path
          fill-rule="evenodd"
          :fill="color"
          d="M23.000,24.000 L21.000,24.000 L3.000,24.000 L1.000,24.000 C0.448,24.000 -0.000,23.552 -0.000,23.000 L-0.000,22.000 C-0.000,21.448 0.448,21.000 1.000,21.000 L3.000,21.000 L3.000,15.000 C3.000,10.029 7.029,6.000 12.000,6.000 C16.971,6.000 21.000,10.029 21.000,15.000 L21.000,21.000 L23.000,21.000 C23.552,21.000 24.000,21.448 24.000,22.000 L24.000,23.000 C24.000,23.552 23.552,24.000 23.000,24.000 ZM22.366,6.366 C22.090,6.844 21.478,7.008 21.000,6.732 C20.522,6.456 20.358,5.844 20.634,5.366 L21.634,4.634 C21.910,4.156 22.522,3.992 23.000,4.268 C23.478,4.544 23.642,5.156 23.366,5.634 L22.366,6.366 ZM12.000,3.000 C11.448,3.000 11.000,2.552 11.000,2.000 L11.000,1.000 C11.000,0.448 11.448,-0.000 12.000,-0.000 C12.552,-0.000 13.000,0.448 13.000,1.000 L13.000,2.000 C13.000,2.552 12.552,3.000 12.000,3.000 ZM3.000,6.732 C2.522,7.008 1.910,6.844 1.634,6.366 L0.634,5.634 C0.358,5.156 0.522,4.544 1.000,4.268 C1.478,3.992 2.090,4.156 2.366,4.634 L3.366,5.366 C3.642,5.844 3.478,6.456 3.000,6.732 Z"
        />
      </svg>
      <div class="bar__point">{{index}}</div>
    </div>
    <main>
      <div class="name">{{names.slice(0,2)}}</div>
      <div class="bar__warp">
        <el-progress
          :percentage="percentage"
          :stroke-width='12'
          :show-text='false'
          :color="color"
          stroke-linecap="butt"
        ></el-progress>
      </div>
    </main>
    <div class="nums">
      <ICountUp
        :delay="count.delay"
        :endVal="value"
        :options="count.options"
      />
    </div>
  </div>
</template>

<script>
import { Progress } from "element-ui";
import ICountUp from "vue-countup-v2";

export default {
  name: "vShareBar",
  mounted() {
    setTimeout(() => {
      this.nums = this.percentage;
    }, 300);
  },
  props: {
    index: {
      type: Number
    },
    names: {
      type: String
    },
    value: {
      type: Number
    },
    percentage: {
      type: Number
    },
    color: {
      type: String
    }
  },
  data() {
    return {
      nums: 0
    };
  },
  components: {
    [Progress.name]: Progress,
    ICountUp
  },
  computed: {
    count() {
      return {
        delay: 500,
        options: {
          useEasing: true,
          useGrouping: true,
          decimalPlaces: 1,
          separator: "",
          decimal: ".",
          prefix: "",
          suffix: "%"
        }
      };
    },
    valuesToNum() {
      // console.log(typeof this.value);
      return this.value - 0;
    }
  }
};
</script>

<style lang="scss" scoped>
.share__bar {
  height: 40px;
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding-left: 6px;
  padding-right: 10px;
  .icon {
    flex: none;
    width: 35px;
    height: 40px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    top: -3px;
    .bar__point {
      position: absolute;
      color: #000000;
      font-size: 14px;
      top: 13px;
      left: 14px;
      font-weight: 600;
    }
  }
  main {
    flex: auto;
    width: 153px;
    height: 100%;
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    padding: 0 7px;
    .name {
      color: #ffffff;
      font-weight: 600;
      font-size: 14px;
    }
    .bar__warp {
      width: 105px;
      height: 100%;
      padding-top: 14px;
    }
  }
  .nums {
    width: 66px;
    height: 100%;
    font-weight: 600;
    flex: none;
    display: flex;
    align-items: center;
    font-size: 16px;
    padding-left: 2px;
    color: #02eaff;
    padding-top: 2px;
  }
  /deep/.el-progress-bar__outer {
    background-color: #1e3656;
    border-radius: 0;
    .el-progress-bar__inner {
      border-radius: 0 100px 100px 0;
    }
  }
}
</style>