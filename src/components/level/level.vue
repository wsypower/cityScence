<template>
  <div class="level__layout">
    <header>
      {{title}}
    </header>
    <main>
      <div
        class="level__item"
        v-for="(item, index) in level"
        :key="index"
      >
        <div
          class="point"
          :class="item.color"
        ></div>
        <div class="label__name">{{item.name}}</div>
      </div>
    </main>

  </div>
</template>

<script>
export default {
  name: "vLevel",
  props: {
    title: {
      type: String
    },
    level: {
      type: Array, // //≤
      default: function() {
        return [
          {
            color: "green",
            name: "优秀（≤6.13%）"
          },
          {
            color: "yellow",
            name: "合格（6.13<x≤10%）"
          },
          {
            color: "red",
            name: "不合格（>10%）"
          },
          {
            color: "gray",
            name: "无数据"
          }
        ];
      }
    }
  }
};
</script>

<style lang="scss" scoped>
.level__layout {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  header {
    width: 100%;
    height: 34px;
    display: flex;
    align-items: center;
    color: #fff;
    font-size: 16px;
    font-weight: 600;
    flex: none;
  }
  main {
    flex: auto;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    .level__item {
      width: 100%;
      height: 34px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-weight: 600;

      .point {
        flex: none;
        width: 24px;
        height: 24px;
        border-radius: 50%;
      }
      .green {
        background-color: #03f146;
      }
      .yellow {
        background-color: #ffea00;
      }
      .red {
        background-color: #e2111b;
      }
      .orange {
        background-color: #fe7200;
      }
      .gray {
        background-color: #b5b5b5;
      }
      .label__name {
        display: flex;
        flex: auto;
        height: 100%;
        color: #ffffff;
        font-size: 16px;
        padding-left: 9px;
        font-weight: 600;
        display: flex;
        align-items: center;
        padding-top: 2px;
      }
    }
  }
}
</style>