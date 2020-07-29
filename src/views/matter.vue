<!--
 * @Description: 
 * @Author: huacong
 * @Date: 2020-07-28 22:32:36
 * @LastEditTime: 2020-07-29 09:53:57
 * @LastEditors: huacong
--> 

<template>
  <div class="matter">
    <div class="layout-left">
      <v-card :height='775'>
        <v-card-base
          title='统建事项分类'
          :width="447"
          :height="314"
        >
        </v-card-base>
        <v-card-base
          title='事项TOP5'
          :width="447"
          :height="322"
          :buttons="matterTop"
          @tabChangeHandler='matterTopChangeHandler'
        >
        </v-card-base>
      </v-card>
    </div>
    <div class="layout-center">
      <div class="center__controller"></div>
      <v-card-base
        title='办件趋势'
        :width="819"
        :height="212"
        :buttons="office"
        @tabChangeHandler="officeTabChange"
      >
      </v-card-base>
    </div>
    <div class="layout-right">
      <v-card :height='775'>
        <v-card-base
          title='统计分析'
          :width="447"
          :height="227"
          :buttons="statistical"
          @tabChangeHandler="statisticalTabChange"
        >
        </v-card-base>
        <v-card-base
          title='部门排列 TOP10'
          :width="447"
          :height="411"
          :buttons="department"
          @tabChangeHandler='departmentTabChange'
          scroll
        >
        </v-card-base>
      </v-card>
    </div>

  </div>
</template>

<script>
import cardBase from "@/components/card/card-base/card-base.vue";
import card from "@/components/card/card/card.vue";
export default {
  name: "matter",
  components: {
    [cardBase.name]: cardBase,
    [card.name]: card
  },
  data() {
    return {
      matterTop: [
        { name: "本周" },
        { name: "本月" },
        { name: "本年" },
        { name: "累计" }
      ],
      statistical: [
        { name: "今天" },
        { name: "本月" },
        { name: "本年" },
        { name: "累计" }
      ],
      department: [{ name: "按月度受理数" }, { name: "按月度办结数" }],
      office: [{ name: "本周" }, { name: "本月" }, { name: "本年" }]
    };
  },
  methods: {
    /**
     * @description
     * 时间top 选项卡回调
     */
    matterTopChangeHandler(data) {
      console.log(data);
    },
    /**
     * @description
     * 部门排列TOP10 选项卡回调
     */
    departmentTabChange(data) {
      console.log(data);
    },
    statisticalTabChange(data) {
      console.log(data);
    },
    officeTabChange(data) {
      console.log(data);
    }
  }
};
</script>

<style lang="scss" scoped>
.matter {
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: row;
  padding: 0 30px;
  justify-content: space-between;
  .layout-left {
    height: 100%;
    width: 487px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .layout-center {
    height: 100%;
    width: 819px;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding-bottom: 52px;
    .center__controller {
      width: 100%;
      height: calc(100% - 212px);
    }
  }
  .layout-right {
    height: 100%;
    width: 487px;
    display: flex;
    justify-content: center;
    align-items: center;
  }
}
</style>