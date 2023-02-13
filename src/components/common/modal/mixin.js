
export default {
  props: {
    appendToBody: {
      type: Boolean,
      default: false
    },
  },
  mounted() {
    if (this.appendToBody) {
      document.body.appendChild(this.$el);
    }
  },
};
