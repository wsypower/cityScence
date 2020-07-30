<template>
  <div class="nav">
    <div
      id="nav__warp"
      ref="footer"
    >
      <div class="nav-cneter">
        <div
          class="nav__controller"
          ref='CanvasLight'
        >
        </div>
        <div class="canvas-warp">
          <canvas
            ref='CanvasShape'
            width="876"
            height="110"
          ></canvas>
        </div>
        <!-- 控制栏 -->
        <div class="controll">
          <ul>
            <li
              v-for="(item,index) in nav"
              :key="index"
              @click="clickLightUp(item.x,index)"
              :class=" tabIndex === index?'active':'' "
            >
              <span
                class="iconfont"
                :class="[ item.icon]"
              ></span>
              <span>{{item.value}}</span>
            </li>

          </ul>
          <div
            ref="slider"
            class="nav__controller-slider"
          ></div>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import NavCanvasAnimate from "./index.js";
export default {
  name: "v-gloabl-nav",
  data() {
    return {
      tabIndex: 2,
      activeClass: "active",
      nav: [
        {
          icon: "icon-daibanshixiang",
          value: "项目仓",
          router: "",
          x: 167
        },
        {
          icon: "icon-gongxiang",
          value: "共享仓",
          router: "/share",
          x: 303
        },
        {
          icon: "icon-shouye1-copy",
          value: "首页",
          router: "/",
          x: 439
        },
        {
          icon: "icon-yunhang",
          value: "运行仓",
          router: "",
          x: 570
        },
        {
          icon: "icon-daibanshixiang",
          value: "事项仓",
          router: "/matter",
          x: 704
        }
      ]
    };
  },
  computed: {
    navScalyCanvasDom() {
      return this.$refs.CanvasLight;
    },
    shape() {
      return this.$refs.CanvasShape;
    },
    slider() {
      return this.$refs.slider;
    },
    footer() {
      return this.$refs.footer;
    }
  },
  mounted() {
    // 初始化canvas对象
    NavCanvasAnimate.init({
      target: this.navScalyCanvasDom,
      shape: this.shape,
      slider: this.slider,
      footer: this.footer
    });
  },
  methods: {
    clickLightUp(x, index) {
      this.tabIndex = index;
      NavCanvasAnimate.clickLightUp(x, index);
      this.nav[index].router && this.$router.push(this.nav[index].router);
    }
    // hoverLightUp() {
    //   NavCanvasAnimate.hoverLightUp();
    // }
  }
};
</script>

<style lang="scss" scoped>
.nav {
  width: 100%;
  height: 100%;
  background: url("~@/assets/images/nav-back.png") no-repeat bottom;
  #nav__warp {
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;

    .nav-cneter {
      width: 876px;
      height: 121px;
      position: relative;
      cursor: pointer;
      .canvas-warp {
        width: 876px;
        height: 121px;
        position: absolute;
        top: 10px;
      }
      .nav__controller {
        width: 876px;
        height: 121px;
        position: absolute;
        top: 8px;
      }
    }
  }
  .controll {
    width: 100%;
    height: 100%;
    position: absolute;
    top: 0px;
    ul {
      display: flex;
      flex-direction: row;
      justify-content: space-around;
      padding: 18px 102px;
      li {
        width: 69px;
        height: 90px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        padding-top: 20px;
        padding-bottom: 15px;
        z-index: 10;
        span {
          font-size: 18px;
          color: #aff1ff;
          font-weight: 550;
          text-shadow: -1px 0px 14px #6adaffba;
        }
        .iconfont {
          font-size: 25px;
          margin-bottom: 15px;
          color: transparent;
          text-shadow: -1px 0px 5px #6adaffba;

          &:before {
            background: linear-gradient(
              0deg,
              #009dff 0%,
              #00cdf6 56%,
              #00fdec 100%
            );
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
      .active {
        span {
          color: #fff;
          text-shadow: -1px 0px 14px #fff;
        }
        .iconfont {
          color: #fff;
          text-shadow: -1px 0px 5px #fff;
          &:before {
            background: linear-gradient(0deg, #fff 0%, #fff 56%, #fff 100%);
            -webkit-background-clip: text;
            color: transparent;
          }
        }
      }
    }
    .nav__controller-slider {
      position: absolute !important;
      width: 876px;
      height: 110px;
      left: 0px;
      top: 8px;
      // background-color: rgba(255, 255, 255, 0.1);
    }
  }
}
</style>