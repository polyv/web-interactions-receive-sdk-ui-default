<template>
  <button
    class="plv-iar-default-btn pws-btn-bg-color"
    :disabled="disabled"
    :style="btnStyle"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    disabled: {
      type: Boolean,
    },
    btnStyle: {
      type: Object,
      default: null,
    }
  },
};
</script>

<style lang="scss">
.plv-iar-default-btn {
  position: relative;
  display: inline-block;
  margin: 0 auto;
  width: 100%;
  padding: 13px 20px;
  background: #3082FE;
  border-radius: 25px;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  transition: .15s all ease-in-out;
  font-size: 16px;

  &:active {
    background: rgba(33, 150, 243, 0.9);
  }

  &:disabled {
    background: rgba(48, 130, 254, 0.6);
  }
}
</style>
