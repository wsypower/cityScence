<template>
  <div class="radio__list">
    <a-radio-group
      v-model="value"
      @change="onChange"
      class="radio__grops"
      :class="{'border-botoom-gr':border}"
    >
      <a-radio
        class="radioStyle"
        v-for="(item, index) in radioOptions.options"
        :key="index"
        :value="item.value"
      >
        <div class="radio__name">
          {{item.name.slice(0,10)}}
        </div>
        <div
          class="radio__name"
          v-if="item.name.length>10"
        >
          {{item.name.slice(10)}}
        </div>
      </a-radio>
    </a-radio-group>
  </div>
</template>

<script>
import { Radio } from "ant-design-vue";
import "ant-design-vue/dist/antd.css";

import { wrap } from "spritejs";

export default {
  name: "vRadio",
  components: {
    [Radio.name]: Radio,
    [Radio.Group.name]: Radio.Group
  },
  props: {
    border: {
      type: false
    },
    defaultType: {
      type: String
    },
    radioOptions: {
      type: Object
    }
  },
  mounted() {
    this.value = this.defaultType;
  },
  data() {
    return {
      value: null
    };
  },
  watch: {
    radioOptions(newValue, oldValue) {
      this.value = newValue.options[0].value;
    }
  },
  methods: {
    onChange(e) {
      this.value = e.target.value;
      this.$emit("radioChange", e.target.value);
    }
  }
};
</script>

<style lang="scss" scoped>
.radio__list {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  padding-left: 20px;
  .border-botoom-gr {
    border-bottom: 2px solid #156ec2;
    border-image: linear-gradient(to right, #0689c0, rgba(3, 80, 99, 0)) 10 10;
  }
  .radio__grops {
    width: 100%;
    height: 100%;
    flex-direction: column;
    display: flex;
    justify-content: space-around;
    align-items: center;
    padding-bottom: 20px;

    .radioStyle {
      width: 100%;
      display: flex;
      align-items: center;
      margin: 0px;
      height: 50px;
      color: #ffffff;
      font-size: 16px;
      font-weight: 600;
      cursor: pointer;
      .radio__name {
        display: flex;
      }
      /deep/.ant-radio-inner {
        border-color: #00ffff;
        position: relative;
        top: 0;
        left: 0;
        display: block;
        width: 24px;
        height: 24px;
        border-style: solid;
        border-width: 1px;
        border-radius: 100px;
        transition: all 0.3s;
        border-width: 2px;
        background-color: transparent;
        &::after {
          position: absolute;
          top: 4px;
          left: 4px;
          width: 12px;
          height: 12px;
        }
      }
      /deep/.ant-radio-checked .ant-radio-inner {
        border-color: #00ffff;
        border-width: 2px;
        background-color: transparent;
      }
      /deep/.ant-radio-checked .ant-radio-inner::after {
        transform: scale(1);
        opacity: 1;
        transition: all 0.3s cubic-bezier(0.78, 0.14, 0.15, 0.86);
        background-color: #00ffff;
        // top: 5px;
        // left: 4px;
        // width: 12px;
        // height: 12px;
      }
    }
  }
}
/deep/.ant-radio {
  margin-right: 7px;
  margin-top: -4px;
}
</style>