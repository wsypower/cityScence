
<template>
  <div class="car">
    <header>
      <span>
        <ICountUp
          :delay="count.delay"
          :endVal="value"
          :options="count.options"
        />
      </span>
    </header>
    <main>
      {{name}}
    </main>
  </div>
</template>

<script>
import ICountUp from "vue-countup-v2";
export default {
  name: "vCar",
  components: {
    ICountUp
  },
  props: {
    value: {
      type: Number
    },
    name: {
      type: String
    }
  },

  computed: {
    count() {
      return {
        delay: 800,
        options: {
          useEasing: true,
          useGrouping: true,
          separator: ",",
          decimal: ".",
          prefix: "",
          suffix: ""
        }
      };
    },
    total() {
      return this.pieData.reduce((acc, item) => acc + item.value, 0);
    }
  }
};
</script>

<style lang="scss" scoped>
.car {
  width: 104px;
  height: 72px;
  header {
    width: 100%;
    height: 38px;
    display: flex;
    justify-content: center;
    font-weight: 600;
    span {
      color: #ffde00;
      font-size: 24px;
    }
  }
  main {
    width: 105px;
    height: 34px;
    background: url("~@/assets/images/carb.png");
    color: #02e3fc;
    font-size: 16px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>