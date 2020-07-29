<template>
  <div
    class="card__base"
    :style="{width:width+'px'}"
  >
    <div class="base">
      <header v-if="title&&title!==''">
        <div class="title">
          <div>{{title}}</div>
          <div
            class="picker"
            v-if="datepicker"
          >
            <el-date-picker
              v-model="picker"
              type="datetimerange"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
              :default-time="['12:00:00']"
              size='mini'
            >
            </el-date-picker>
          </div>
        </div>
        <div class="tools">
          <div
            class="button"
            v-for="(item,index) in buttons"
            :key="index"
            :class="{'active':tabIndex === index,'buttonslong':item.name.length>2}"
            @click='buttonClickHandler(index)'
          >
            {{item.name}}
          </div>
        </div>
      </header>
      <main :style="{height:height+'px'}">
        <div class="warp">
          <div class="container">
            <vue-scroll
              :ops="ops"
              v-if="width&&scroll"
            >
              <slot></slot>
            </vue-scroll>
            <div
              class="content"
              v-else
            >
              <slot></slot>
            </div>
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script>
import vueScroll from "vuescroll";
import buttonslong from "../../../assets/images/buttonslong.png";
import { DatePicker } from "element-ui";
export default {
  name: "vCardBase",
  components: {
    vueScroll,
    [DatePicker.name]: DatePicker
  },
  props: {
    datepicker: {
      type: Boolean,
      default: false
    },
    scroll: {
      type: Boolean,
      default: false
    },
    title: {
      type: String
    },
    width: {
      type: Number
    },
    height: {
      type: Number
    },
    buttons: {
      type: Array
    }
  },
  data() {
    return {
      tabIndex: 0,
      picker: "",
      ops: {
        rail: {
          opacity: "1",
          background: "#1D3555",
          size: "8px"
        },
        bar: {
          background: "#003D94",
          keepShow: true,
          size: "8px",
          minSize: 0.2
        },
        scrollButton: {
          enable: false,
          background: "#cecece"
        },
        scrollPanel: {
          easing: "easeInQuad",
          speed: 800
        },
        vuescroll: {
          wheelScrollDuration: 0,
          wheelDirectionReverse: false
        }
      }
    };
  },
  computed: {},

  methods: {
    buttonClickHandler(index) {
      if (index !== this.tabIndex) {
        this.tabIndex = index;
        const data = this.buttons[index];
        this.$emit("tabChangeHandler", { data, index });
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.card__base {
  height: auto;
  .base {
    width: 100%;
    header {
      width: 100%;
      height: 40px;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      .title {
        font-family: title;
        color: #ffffff;
        font-weight: 600;
        font-size: 18px;
        display: flex;
        flex-direction: row;
      }
      .picker {
        width: 190px;
        height: 26px;
        border-radius: 2px;
        border: solid 1px #0ff3f4;
      }
      .tools {
        display: flex;
        flex-direction: row;
        .button {
          width: 71px;
          height: 25px;
          background: url("~@/assets/images/buttons.png") repeat left top;
          color: #ffffff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-size: 14px;
          font-weight: 600;
          margin-right: 8px;
          cursor: pointer;
        }
        .active {
          color: #0ff3f4;
        }
        .buttonslong {
          width: 101px;
          height: 25px;
          background: url("~@/assets/images/buttonslong.png") repeat left top;
        }
      }
    }
    main {
      width: 100%;
      background: url("~@/assets/images/boxbc.png") repeat left top;
      .warp {
        border: 2px solid #156ec2;
        border-image: linear-gradient(
            to right,
            #035063,
            rgba(0, 205, 246, 0.9),
            #035063
          )
          10 10;
        box-shadow: inset 1px 0px 15px 6px rgba(1, 152, 199, 0.2);
        width: 100%;
        height: 100%;
        animation: box 3s infinite ease-in-out;
        position: relative;
        padding: 10px 5px 10px 5px;
        &::before {
          content: "";
          position: absolute;
          height: 100%;
          width: 10px;
          border: 2px solid #00fdee;
          top: -2px;
          left: -2px;
          z-index: 10;
          border-image: linear-gradient(to top, #009dff, #00cdf6, #00fdec) 1 1
            10 10;
          border-right-width: 0px;
        }
        &::after {
          content: "";
          position: absolute;
          height: 100%;
          width: 10px;
          border: 2px solid #00fdee;
          top: -2px;
          right: -2px;
          z-index: 10;
          border-image: linear-gradient(to top, #009dff, #00cdf6, #00fdec) 1 1
            10 10;
          border-left-width: 0px;
        }
        .container {
          width: 100%;
          height: 100%;
          .content {
            width: 100%;
            height: 100%;
          }
        }
      }
    }
  }
}

@keyframes box {
  0% {
    box-shadow: inset 0px 0px 15px 6px rgba(1, 152, 199, 0.1);
  }
  50% {
    box-shadow: inset 0px 0px 25px 6px rgba(1, 152, 199, 0.4);
  }
  100% {
    box-shadow: inset 0px 0px 15px 6px rgba(1, 152, 199, 0.1);
  }
}
</style>