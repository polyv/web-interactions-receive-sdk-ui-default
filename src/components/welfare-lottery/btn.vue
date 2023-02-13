<!-- 条件抽奖按钮组件 -->
<template>
  <button
    type="button"
    :class="[
      'plv-iar-welfare-lottery__btn',
      `plv-iar-welfare-lottery__btn--${size}`,
      `plv-iar-welfare-lottery__btn--${type}`,
      {
        'plv-iar-welfare-lottery__btn--disabled': disabled
      }
    ]"
    @click="onClick"
  >
    <slot></slot>
  </button>
</template>

<script>
export default {
  props: {
    type: {
      type: String,
      default: 'normal'
    },
    size: {
      type: String,
      default: 'lg'
    },
    disabled: {
      type: Boolean,
      default: false
    },
  },
  methods: {
    onClick() {
      if (!this.disabled) {
        this.$emit('click');
      }
    }
  }
};
</script>

<style lang="scss">
.plv-iar-welfare-lottery__btn {
  display: inline-block;
  text-align: center;
  font-weight: 500;
  letter-spacing: 1px;
  cursor: pointer;
  outline: none;
  border: none;
}
.plv-iar-welfare-lottery__btn--lg {
  width: 100%;
  height: 48px;
  line-height: 48px;
  font-size: 16px;
  border-radius: 25px;
}
.plv-iar-welfare-lottery__btn--sm {
  width: 66px;
  height: 32px;
  line-height: 32px;
  font-size: 14px;
  font-weight: normal;
  border-radius: 16px;
}
.plv-iar-welfare-lottery__btn--normal {
  color: #FE3F52;
  background-image: linear-gradient(90deg, #FFF0E5 0%, #FFBE9F 100%);
  box-shadow: inset 2px 1px 5px 0 rgba(255, 255, 255, .7);
}
.plv-iar-welfare-lottery__btn--deep {
  color: #fff;
  background-image: linear-gradient(135deg, #FE9668 0%, #FE3F52 46%, #FF5691 100%);
  box-shadow: none;
}
.plv-iar-welfare-lottery__btn--disabled {
  opacity: .8;
}
.plv-iar-welfare-lottery__btn--normal.plv-iar-welfare-lottery__btn--disabled {
  color: rgba(254, 63, 82, .6);
}
.plv-iar-welfare-lottery__btn--deep.plv-iar-welfare-lottery__btn--disabled {
  color: rgba(255, 255, 255, .6);
}
.plv-iar-welfare-lottery__btn--border {
  color: #FE3F52;
  box-shadow: none;
  background-color: transparent;
  border: 1px solid #FE3F52;
}
.plv-iar-welfare-lottery__btn--lg.plv-iar-welfare-lottery__btn--border {
  line-height: 46px;
}
.plv-iar-welfare-lottery__btn--sm.plv-iar-welfare-lottery__btn--border {
  line-height: 30px;
}
</style>
