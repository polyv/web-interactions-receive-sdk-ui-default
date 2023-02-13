<template>
  <button
    class="iar-answer-card__btn iar-answer-card__btn__mob"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: Boolean,
  },
};
</script>

<style lang="scss" scoped>
@import '../../../assets/styles/basic.scss';

.iar-answer-card__btn {
  width: 100%;
  height: 48px;
  -webkit-appearance: none;
  border: none;
  outline: none;
  border-radius: 24px;
  background-color: transparent;
  color: #4A2206;
  font-size: 16px;
  @include bg('./imgs/redpack-btn-bg.png');
}
</style>
