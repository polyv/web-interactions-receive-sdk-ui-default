export default {
  props: {
    cancelText: {
      type: String,
      default: '取消'
    },
    confirmText: {
      type: String,
      default: '确认'
    },
    msg: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: '提示'
    }
  }
};
