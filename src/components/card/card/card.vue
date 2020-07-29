<template>
  <div
    class="card"
    :style="{height:height+'px'}"
  >
    <div
      class="container"
      v-if="height"
    >
      <slot></slot>
    </div>
  </div>
</template>

<script>
export default {
  name: "vCard",
  props: {
    height: {
      type: Number
    }
  }
};
</script>

<style lang="scss" scoped>
.card {
  width: 100%;
  padding: 12px 6px 14px 6px;
  border: 2px solid #156ec2;
  border-image: linear-gradient(
      to top,
      rgba(3, 80, 99, 0),
      rgba(3, 80, 99, 1),
      #0689c0,
      rgba(3, 80, 99, 1),
      rgba(3, 80, 99, 0)
    )
    10 10;
  .container {
    width: 100%;
    height: 100%;
    background-image: linear-gradient(
      0deg,
      rgba(7, 15, 35, 0) 0%,
      rgba(6, 22, 44, 0.12) 6%,
      #051d34 51%,
      rgba(6, 22, 44, 0.13) 94%,
      rgba(7, 15, 35, 0) 100%
    );
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: space-between;
  }
}
</style>