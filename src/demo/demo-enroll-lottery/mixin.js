import { EnrollLottery } from '@polyv/interactions-receive-sdk';
import { BEFORE_DESTROY } from '@/assets/utils/compat';
export default {
  props: {
    lang: {
      type: String,
      default: 'zh_CN',
    }
  },

  data() {
    return {
      EnrollLottery: null,
      visible: false,
    };
  },

  created() {
    this.EnrollLottery = new EnrollLottery();
  },

  [BEFORE_DESTROY]() {
    this.destroy();
  },

  methods: {
    updateModalVisible(visible) {
      this.visible = visible;
    },

    destroy() {
      this.EnrollLottery && this.EnrollLottery.destroy();
      this.EnrollLottery = null;
    },
  },
};
