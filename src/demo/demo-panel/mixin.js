export default {
  data() {
    return {
      lang: 'zh_CN',
    };
  },

  watch: {
    lang() {
      this.$emit('lang-change', this.lang);
    },
  },
};
