<template>
  <button
    class="plv-iar-btn pws-vclass-btn--primary"
    :class="{
      [typeClass]: true,
      [pwsTypeClass]: true,
      'plv-iar-btn-default__small': size === 'small'
    }"
    :style="btnStyle"
    :disabled="disabled"
    @click="$emit('click', $event)"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: ''
    },
    disabled: {
      type: Boolean,
    },
    isMobile: {
      type: Boolean,
    },
    size: {
      type: String,
      default: '',
    },
    btnStyle: {
      type: Object,
      default: () => null,
    },
  },
  computed: {
    typeClass() {
      let btnTypeClass = '';
      const arr = ['cancel', 'delete'];
      if (arr.includes(this.type)) {
        btnTypeClass = `plv-iar-btn--${this.type}`;
      }
      return btnTypeClass;
    },
    pwsTypeClass() {
      let btnTypeClass = 'pws-btn-bg-color';
      const arr = ['cancel', 'delete'];
      if (arr.includes(this.type)) {
        btnTypeClass = `pws-btn-bg-color--${this.type}`;
      }
      return btnTypeClass;
    }
  }
};
</script>

<style lang="scss">
.plv-iar-btn {
  position: relative;
  display: inline-block;
  padding: 9px 20px;
  background: rgba(33, 150, 243, 1);
  border-radius: 18px;
  border: none;
  outline: none;
  color: #fff;
  cursor: pointer;
  transition: .15s all ease-in-out;
  font-size: 14px;
  line-height: 1;
  user-select: none;

  &:hover {
    background: rgba(33, 150, 243, 0.8);
  }

  &:active {
    background: rgba(33, 150, 243, 0.9);
  }

  &:disabled {
    background: #E9ECEE;
    color: #fff;
    cursor: not-allowed;
  }
  &--cancel {
    margin-right: 12px;
    border: 1px solid #b0bec5;
    background: #fff;
    color: #333;
  }
}

.plv-iar-btn-default__small {
  padding: 13px 0;
}
</style>
