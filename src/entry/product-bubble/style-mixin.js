/**
 * 气泡样式逻辑
 */
export default {
  props: {
    // 动画类型，normal-常规、scale-缩放
    animationType: {
      type: String,
      default: 'normal',
    },
    // 气泡宽度
    width: {
      type: String,
      default: '308px',
    },
  },

  computed: {
    // 动画名称
    transitionName() {
      let name = '';
      switch (this.animationType) {
        case 'normal':
          name = 'plv-iar-product-bubble-animation-normal';
          break;
        case 'scale':
          name = 'plv-iar-product-bubble-animation-scale';
          break;
      }
      return name;
    },

    // 外层样式
    wrapStyle() {
      const style = {};
      if (this.animationType === 'normal') {
        style.width = this.width;
      }
      return style;
    },

    // 内层样式
    innerStyle() {
      const style = {};
      if (this.animationType === 'scale') {
        style.width = this.width;
      }
      return style;
    },
  },
};
