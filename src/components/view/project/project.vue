<template>
  <div class="project">
    <header>
      <div
        class="header-item"
        v-for="(item, index) in aims"
        :key="index"
      >
        <div class="header-item-name">{{item.name}}：</div>
        <div class="header-item-values">
          <ICountUp
            :delay="count.delay"
            :endVal="item.value"
            :options="count.options"
          />{{index==2?`%`:``}}
        </div>
      </div>
    </header>
    <main>
      <div class="content-head">区域建成率排名</div>
      <div class="content-table">
        <div class="table-item table-header">
          <div class="item-header">排名</div>
          <div class="item-city">城市</div>
          <div class="item-value">建成量</div>
          <div class="item-percentage">建成率</div>
        </div>
        <div
          class="table-item"
          v-for="(item, index) in completionRate"
          :key="index"
        >
          <div class="item-header">
            <div class="item-index">
              {{index+1}}
            </div>
          </div>
          <div class="item-city">{{item.name}}</div>
          <div class="item-value">
            <ICountUp
              :delay="count.delay"
              :endVal="item.value"
              :options="count.options"
            />
          </div>
          <div class="item-percentage">
            <ICountUp
              :delay="count.delay"
              :endVal="item.percentage"
              :options="count.options"
            />%
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "vProject",
  props: {
    aims: {
      type: Array
    },
    completionRate: {
      type: Array
    }
  },
  components: {
    ICountUp
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
  mounted() {},
  methods: {
    padStart(str, index = "name", seprator = "") {
      const max = Math.max(
        ...this.completionRate.map(v => `${v[name]}`.length)
      );
      console.log("max", max);
      const len = max >= `${str}`.length ? ~~(max - `${str}`.length) / 2 : 0;
      return str.padStart(len, seprator).padEnd(len, seprator);
    }
  }
};
</script>

<style lang="scss" scoped>
.project {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 50px;
  header {
    .header-item {
      width: 302px;
      height: 46px;
      background-image: linear-gradient(to right, #003f65, rgba(3, 50, 96, 0));
      position: relative;
      display: flex;
      flex-direction: row;
      justify-content: space-between;
      align-items: center;
      padding: 0 15px 0 30px;
      margin-bottom: 8px;
      &::before {
        content: "";
        position: absolute;
        height: 46px;
        width: 6px;
        background-color: #00e5ff;
        left: 0px;
        top: 0;
      }
      .header-item-name {
        color: #fff;
        font-size: 16px;
        font-weight: 600;
      }
      .header-item-values {
        color: #00f7ff;
        font-size: 18px;
        font-weight: 600;
      }
    }
  }
  main {
    width: 302px;
    margin-top: 14px;
    .content-head {
      height: 50px;
      width: 100%;
      font-family: title;
      color: #ffffff;
      font-weight: 600;
      font-size: 18px;
      display: flex;
      flex-direction: row;
      align-items: center;
      font-weight: 600;
    }
    .content-table {
      width: 100%;
      background-color: #063360;
      .table-item {
        width: 100%;
        height: 39px;
        border: 1px solid #000;
        border-top-color: #3038a6;
        border-bottom-color: #3038a6;
        border-left-color: #2e7dbd;
        border-right-color: #2e7dbd;
        display: flex;
        justify-content: space-around;
        flex-direction: row;
        align-items: center;
        .item-header {
          width: 25%;
          color: #001113;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item-index {
          width: 22px;
          height: 22px;
          background-color: #00c0ff;
          display: flex;
          justify-content: center;
          align-items: center;
          font-weight: 600;
          border-radius: 6px;
          font-size: 14px;
          box-shadow: 1px 1px 2px 0px #061629bf;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item-city {
          width: 25%;
          font-weight: 600;
          color: #fff;
          font-size: 14px;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item-value {
          width: 25%;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item-percentage {
          width: 25%;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
      .table-item.table-header {
        background-color: #01cdf2;
        .item-header {
          width: 25%;
          color: #001113;
          font-size: 14px;
          font-weight: 600;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item-city {
          color: #001113;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item-value {
          color: #001113;
          display: flex;
          justify-content: center;
          align-items: center;
        }
        .item-percentage {
          color: #001113;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
  }
}
</style>