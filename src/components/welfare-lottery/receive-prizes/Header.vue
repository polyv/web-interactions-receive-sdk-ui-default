<!-- 领奖头部公共组件 -->
<template>
  <div>
    <span class="plv-iar-welfare-lottery__modal__back-btn--black" @click="$emit('back')"></span>
    <h2 class="plv-iar-welfare-lottery__modal__title--center">{{ title }}</h2>
  </div>
</template>

<script>
export default {
  props: {
    title: {
      type: String,
      default: ''
    },
  },
};
</script>
<style lang="scss">
.plv-iar-welfare-lottery__receive-modal {
  .plv-iar-welfare-lottery__modal__back-btn--black {
    position: absolute;
    top: 14px;
  }
}
</style>
