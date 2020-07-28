<template>
  <div
    class="card__base"
    :style="{width:width+'px'}"
  >
    <div class="base">
      <header>
        <div class="title">{{title}}</div>
        <div class="tools"></div>
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
export default {
  name: "vCardBase",
  props: {
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
    }
  },
  data() {
    return {
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
  components: {
    vueScroll
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
      }
      .tools {
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
            rgba(0, 205, 246, 0.8),
            #035063
          )
          10 10;
        box-shadow: inset 1px 0px 15px 6px rgba(1, 152, 199, 0.2);
        width: 100%;
        height: 100%;
        animation: box 3s infinite ease-in-out;
        position: relative;
        padding: 10px 5px 10px 10px;
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
    box-shadow: inset 0px 0px 25px 6px rgba(1, 152, 199, 0.3);
  }
  100% {
    box-shadow: inset 0px 0px 15px 6px rgba(1, 152, 199, 0.1);
  }
}
</style>