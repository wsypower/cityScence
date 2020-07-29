<!--
 * @Description: 
 * @Author: huacong
 * @Date: 2020-07-29 19:29:07
 * @LastEditTime: 2020-07-29 20:59:54
 * @LastEditors: huacong
--> 
<template>
  <div class="bar">
    <div class="layout__left">
      <!-- {{index}} -->
      <svg
        width="22px"
        height="30px"
      >
        <path
          fill-rule="evenodd"
          :fill="color"
          d="M11.000,30.000 L-0.000,22.000 L-0.000,4.000 L22.000,4.000 L22.000,22.000 L11.000,30.000 ZM-0.000,-0.000 L22.000,-0.000 L22.000,2.000 L-0.000,2.000 L-0.000,-0.000 Z"
        />
      </svg>
      <div class="icon__nums">{{index+1}}</div>
    </div>
    <div class="layout__right">
      <header>{{names}}</header>
      <main>
        <div class="bar__item">
          <el-progress
            :percentage="nums"
            :stroke-width='12'
            :show-text='false'
            :color="color"
            stroke-linecap="butt"
          ></el-progress>
        </div>
        <div class="bar__num">
          <ICountUp
            :delay="count.delay"
            :endVal="value"
            :options="count.options"
          />
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import { Progress } from "element-ui";
import ICountUp from "vue-countup-v2";
export default {
  name: "vBar",
  components: {
    [Progress.name]: Progress,
    ICountUp
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
      type: String,
      default: "red"
    }
  },
  computed: {
    count() {
      return {
        delay: 500,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: "",
          decimal: ".",
          prefix: "",
          suffix: ""
        }
      };
    }
  },
  mounted() {
    setTimeout(() => {
      this.nums = this.percentage;
    }, 300);
  },
  watch: {
    percentage(newValue, oldValue) {
      this.nums = newValue;
    }
  },
  data() {
    return {
      nums: 0
    };
  }
};
</script>

<style lang="scss" scoped>
.bar {
  width: 396px;
  height: 39px;
  display: flex;
  flex-direction: row;
  margin-bottom: 15px;
  cursor: pointer;
  .layout__left {
    width: 42px;
    height: 100%;
    flex: none;
    display: flex;
    align-items: center;
    position: relative;
    padding-top: 12px;
    .icon__nums {
      position: absolute;
      font-weight: 600;
      color: #001f22;
      width: 100%;
      height: 100%;
      top: 15px;
      left: -10px;
      font-size: 16px;
    }
  }
  .layout__right {
    flex: auto;
    display: flex;
    flex-direction: column;
    header {
      height: 26px;
      width: 100%;
      color: #ffffff;
      font-size: 14px;
      display: flex;
      vertical-align: top;
    }
    main {
      display: flex;
      height: calc(100% - 26px);
      flex-direction: row;
      align-items: center;
      justify-content: center;
      .bar__item {
        width: 300px;
        flex: none;
        height: 100%;
        padding-top: 5px;
      }
      .bar__num {
        height: 100%;
        flex: auto;
        color: #02eaff;
        font-size: 16px;
        padding-left: 8px;
        font-weight: 600;
      }
    }
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