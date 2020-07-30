<template>
  <div class="home">
    <div class="card__containr">
      <float-card-warp
        class="card-warp"
        v-for="(item,index) in cards"
        :key="index"
        :width='item.width'
        :height='item.height'
        :background="item.url"
        :style="{transformStyle:'preserve-3d',transform:' perspective(410px) rotateY('+item.deg+'deg)'}"
      >
        <div class="card">
          <header>{{item.name}}</header>
          <main>
            <span>
              <ICountUp
                :delay="count.delay"
                :endVal="item.value"
                :options="count.options"
              />
            </span>
          </main>
          <footer>
            <div class="card__item">
              <span>年度累计</span>
              <span>
                {{item.yearNum}}
                <!-- <ICountUp
                  :delay="count.delay"
                  :endVal="item.yearNum"
                  :options="count.options"
                /> -->
              </span>
            </div>
            <div class="card__item">
              <span>月度更新</span>
              <span>
                {{item.mothNum}}
                <!-- <ICountUp
                  :delay="count.delay"
                  :endVal="item.mothNum"
                  :options="count.options"
                /> -->
              </span>
            </div>
          </footer>
        </div>
      </float-card-warp>
    </div>
    <div class="features"></div>
  </div>
</template>
<script>
import cardFloatWarp from "@/components/card/card-warp/float-card-warp.vue";
import ICountUp from "vue-countup-v2";

export default {
  name: "index",
  components: {
    [cardFloatWarp.name]: cardFloatWarp,
    ICountUp
  },
  data() {
    return {
      cards: [
        {
          name: "工程项目舱",
          value: 1800,
          yearNum: 700,
          mothNum: 500,
          deg: 16,
          width: 390,
          height: 265,
          url: require("@/assets/images/001.png")
        },
        {
          name: "交换共享舱",
          value: 1800,
          yearNum: 700,
          mothNum: 500,
          deg: 7,
          width: 360,
          height: 225,
          url: require("@/assets/images/004.png")
        },
        {
          name: "运行监测舱",
          value: 800,
          yearNum: 700,
          mothNum: 500,
          deg: 353,
          width: 360,
          height: 225,
          url: require("@/assets/images/003.png")
        },
        {
          name: "事项审批舱",
          value: 1200,
          yearNum: 700,
          mothNum: 500,
          deg: 344,
          width: 390,
          height: 265,
          url: require("@/assets/images/004.png")
        }
      ]
    };
  },
  computed: {
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
    }
  }
};
</script>

<style lang="scss" scoped>
.home {
  width: 100%;
  height: 100%;
  position: relative;
  display: flex;
  justify-content: center;
  .card__containr {
    width: 100%;
    height: 396px;
    z-index: 20;
    display: flex;
    flex-direction: row;
    justify-content: center;
    align-items: center;
    .card-warp {
      z-index: 10;
      &:hover {
        z-index: 11;
      }
      &:nth-child(2),
      &:nth-child(3) {
        .card {
          header {
            margin-top: -5px;
          }
          main {
            height: 60px;
          }
        }
      }
    }
    .card {
      width: 100%;
      height: 100%;
      font-size: 60px;
      font-weight: 600;
      color: #02eaff;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;
      text-shadow: 1px 1px 1px #060d19;

      header {
        color: #ffffff;
        font-size: 30px;
        width: 100%;
        font-family: title;
      }
      main {
        height: 80px;
        font-size: 40px;
        font-weight: 600;
        width: 100%;
        display: flex;
        flex-direction: row;
        justify-content: center;
        align-items: center;
        margin-bottom: 15px;
        text-shadow: 0px 0px 3px #6bf3ff;
      }
      footer {
        width: 100%;
        display: flex;
        flex-direction: row;
        align-items: center;
        justify-content: center;
        font-size: 18px;

        .card__item {
          font-family: title;
          span {
            &:first-child {
              margin-right: 5px;
            }
          }

          &:first-child {
            font-family: title;
            margin-right: 20px;
          }
        }
      }
    }
  }
  .features {
    position: absolute;
    width: 100%;
    height: 582px;
    bottom: 0px;
    background: url("~@/assets/images/indemain.png") no-repeat center center;
  }
}
</style>